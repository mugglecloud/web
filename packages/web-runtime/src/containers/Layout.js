/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { useOvermind, StoreScope, ScopeContext } from "runtime/hooks/overmind";
import { Switch, Route, Redirect } from "react-router-dom";
import { json, mutate } from "overmind";
import { IS_OPERATOR } from "overmind/es/utils";

import store from "../store";
import { installPlugin } from "runtime/base/runtime";
import { getScopeId } from "runtime/base/utils";

// const pages = { Home, CodeList, Board, SchemaForm };
const INSTALLED_MODULE_CACHE = new Map();

function scope(name, operator) {
  operator = operator[IS_OPERATOR] ? operator : mutate(operator);
  const instance = (err, context, next, final) => {
    ScopeContext.set(getScopeId(context), name);
    operator(err, context, next, final);
  };
  instance[IS_OPERATOR] = true;

  return instance;
}

function scopeActions(name, actions) {
  const modActions = {};
  for (let k in actions) {
    modActions[k] = scope(name, actions[k]);
  }
  return modActions;
}

const installModule = mod => {
  const { state, actions, effects } = store;
  const ns = mod.namespace;
  const name = mod.name;

  if (!ns || !name) throw new Error("namespace and name is required");

  ns.actions.INTERNAL_INIT_FOR_INTERNAL_USE_ONLY_DO_NOT_USE_IT_ELSEWHERE = (
    overmindInstance,
    initialProps
  ) => {
    Object.assign(overmindInstance.state[name], json(initialProps));
  };

  state[name] = store.getState(ns);
  actions[name] = store.getActions(scopeActions(name, ns.actions));
  effects[name] = ns.effects;

  if (ns.onInitialize) {
    const onInitialize = store.createAction(
      "onInitialize",
      scope(name, ns.onInitialize)
    );
    Promise.resolve(onInitialize(store));
  }

  return name;
};

function renderUi(ui) {
  let mod = ui.component
    ? json(ui.component)
    : installPlugin(ui.name, ui.source);

  mod = mod && (mod.default || mod);
  if (!mod) {
    return null;
  }

  if (!INSTALLED_MODULE_CACHE.has(ui.name)) {
    INSTALLED_MODULE_CACHE.set(ui.name, installModule(mod));
  }

  return memo(props => {
    const { actions } = useOvermind();
    useMemo(() => {
      console.log("use memo", mod.name);
      actions[
        mod.name
      ].INTERNAL_INIT_FOR_INTERNAL_USE_ONLY_DO_NOT_USE_IT_ELSEWHERE(
        props.initialProps
      );
    }, [props.initialProps, mod.name]);
    return mod.component ? (
      <StoreScope.Provider value={INSTALLED_MODULE_CACHE.get(ui.name)}>
        <mod.component {...props.initialProps} />
      </StoreScope.Provider>
    ) : null;
  });
}

function Routes({ routes, pages = {} }) {
  const { state } = useOvermind();

  let noMatch = (
    <Route>
      <div>Not Found</div>
    </Route>
  );
  let authPage = (
    <Route>
      <div>Authorization Is Required</div>
    </Route>
  );

  let redirectPage = null;
  let notNeedAuth = [];
  let needAuth = [];

  routes.forEach(route => {
    if (route.redirect) {
      redirectPage = (
        <Redirect
          key={`redirect:${Math.random()}:${route.redirect}`}
          to={route.redirect}
          exact
        />
      );

      return null;
    }

    if (!route.ui_components || !route.ui_components.length) {
      console.warn("ui is required", route.ui_components);
      return null;
    }

    const C = route.ui_components.map(ui => {
      const OC = renderUi(ui);
      return OC && <OC key={ui.name} initialProps={ui.initialProps} />;
    });
    const RR = <Route>{C}</Route>;

    if (route.authpage) {
      authPage = RR;
      return null;
    }

    if (route.nomatch) {
      noMatch = RR;
      return null;
    }

    const path = route.path;
    const exact = route.exact == null ? path === "/" || !path : route.exact;

    // console.log(path, exact);

    const R = (
      <Route key={path} path={path} exact={exact}>
        {C}
      </Route>
    );
    route.auth ? needAuth.push(R) : notNeedAuth.push(R);
  });

  return (
    <Switch>
      {React.Children.map(notNeedAuth, React.cloneElement)}
      {!state.token && React.cloneElement(authPage)}
      {React.Children.map(needAuth, React.cloneElement)}
      {redirectPage && React.cloneElement(redirectPage)}
      {noMatch && React.cloneElement(noMatch)}
    </Switch>
  );
}

export default () => {
  const { state } = useOvermind();

  if (!state.config.routes.length)
    return (
      <div
        style={{
          justifyContent: "center",
          padding: "30px"
        }}
      >
        loading ...
      </div>
    );

  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <Routes routes={state.config.routes} pages={state.config.pages} />
    </div>
  );
};
