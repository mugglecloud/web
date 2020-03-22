import React from "react";
import { OvermindProvider } from "runtime/hooks";
import store from "runtime/store";
import { BrowserRouter as Router } from "react-router-dom";
import { useOvermind } from "runtime/hooks";

if (process.env.NODE_ENV === "development") {
  // disable proxy state tree devmode to pass track mutation
  store.proxyStateTree.master.options.devmode = false;
  console.log(store);
}

function RenderRest(props) {
  const { state } = useOvermind();

  if (!state.runtimeDepsLoaded) return <div>loading ...</div>;

  return (props.providers || state.config.providers || []).reduce(
    (pre, cur) => {
      return React.cloneElement(cur.element, cur.props, pre);
    },
    <>
      {props.initializer}
      {props.children}
    </>
  );
}

export default ({ children, providers = null, initializer = null }) => {
  return (
    <OvermindProvider value={store}>
      <Router>
        <RenderRest providers={providers} initializer={initializer}>
          {children}
        </RenderRest>
      </Router>
    </OvermindProvider>
  );
};
