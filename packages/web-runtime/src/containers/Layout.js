/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { json, mutate } from "overmind";
import { IS_OPERATOR } from "overmind/es/utils";

import { useOvermind, StoreScope, ScopeContext } from "../hooks";
import store from "../store";
import { installPlugin } from "../base/runtime";
import { getScopeId } from "../base/utils";

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

  const routeComponents = routes.map(route => {
    if (!route.ui_components || !route.ui_components.length) {
      console.warn("ui is required", route.ui_components);
      return null;
    }

    const component = route.ui_components.map(ui => {
      if (ui.component)
        return React.cloneElement(ui.component, { key: ui.name });

      const OC = renderUi(ui);
      return OC && <OC key={ui.name} initialProps={ui.props} />;
    });

    const path = route.path;
    const exact = route.exact == null ? path === "/" || !path : route.exact;

    const C = route.redirect ? (
      <Redirect to={route.redirect} />
    ) : !route.need_auth || state.token ? (
      component
    ) : (
      pages.auth
    );

    return (
      <Route key={path} path={path} exact={exact}>
        {C}
      </Route>
    );
  });

  return (
    <Switch>
      {routeComponents}
      <Route>{pages.nomatch}</Route>
    </Switch>
  );
}

export default () => {
  const { state } = useOvermind();

  const { routes, pages } = state.config;

  if (!routes.length)
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10px"
        }}
      >
        {pages.loading || "loading ..."}
      </div>
    );

  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <Routes routes={routes} pages={pages} />
    </div>
  );
};
