import React, { useEffect } from "react";
import store from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { useOvermind, OvermindProvider } from "../hooks";

if (process.env.NODE_ENV === "development") {
  // disable proxy state tree devmode to pass track mutation
  store.proxyStateTree.master.options.devmode = false;
  console.log(store);
}

function RenderRest(props) {
  const {
    state: { config },
    actions
  } = useOvermind();

  useEffect(() => {
    actions.setConfig(props.config);
  }, []);

  if (!config || !config.runtime_deps) return null;

  return (config.providers || []).reduce(
    (pre, cur) => {
      return React.cloneElement(cur.element, cur.props, pre);
    },
    <>
      {config.initializer}
      {props.children}
    </>
  );
}

const Runtime = ({ children, config }) => {
  return (
    <OvermindProvider value={store}>
      <Router>
        <RenderRest config={config}>{children}</RenderRest>
      </Router>
    </OvermindProvider>
  );
};

export const RuntimeProvider = ({ config = {}, children }) => {
  return <Runtime config={config}>{children}</Runtime>;
};

export default Runtime;
