import React, { useEffect } from "react";
import { Provider as OvermindProvider } from "overmind-react";
import store from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { useOvermind } from "../hooks";

if (process.env.NODE_ENV === "development") {
  // disable proxy state tree devmode to pass track mutation
  store.proxyStateTree.master.options.devmode = false;
  console.log(store);
}

function RenderRest(props) {
  const {
    state: { config }
  } = useOvermind();

  if (!config.runtime_deps) return null;

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

const Runtime = ({ children }) => {
  return (
    <OvermindProvider value={store}>
      <Router>
        <RenderRest>{children}</RenderRest>
      </Router>
    </OvermindProvider>
  );
};

export const RuntimeProvider = ({ config = {}, children }) => {
  const { actions } = useOvermind();

  useEffect(() => {
    actions.setConfig(config);
  }, []);

  return <Runtime>{children}</Runtime>;
};

export default Runtime;
