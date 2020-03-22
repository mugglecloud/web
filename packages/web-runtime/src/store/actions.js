/* eslint-disable react-hooks/rules-of-hooks */
// import * as o from "./operators";
import { json } from "overmind";
import { adjustPath } from "./utils";
import { installPlugin } from "runtime/base/runtime";

export const getConfig = async ({ effects, actions, state }) => {
  let r = await effects.http.get("/app-conf/config");
  const { routes, runtime_deps, pages, providers } = r.data;
  actions.addRuntimeDeps(runtime_deps);
  actions.setRoutes(routes);

  state.config.providers = providers;
  state.config.pages = pages;
};

export const setRoutes = ({ state }, routes = []) => {
  let tree = new Map();
  routes.forEach(r => tree.set(r.id, r));
  adjustPath(tree);
  state.config.routes = routes;
};

export const addRoutes = ({ state, actions }, routes = []) => {
  actions.setRoutes(json(state.routes).concat(routes));
};

export const addRuntimeDeps = async ({ state, actions }, deps = []) => {
  if (state.runtimeDepsLoaded) actions.depsLoaded(false);

  const promises = deps.map(async dep => {
    let r = await window.fetch(dep.url);
    // console.log(r.get("Content-Type"));
    let code = await r.text();
    installPlugin(dep.name, code);
  });

  await Promise.all(promises);

  actions.depsLoaded();
};

export const depsLoaded = ({ state }, loaded = true) => {
  state.runtimeDepsLoaded = loaded;
};
