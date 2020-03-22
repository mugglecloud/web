/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./containers/App";
import Runtime from "./containers/Runtime";
import { useOvermind } from "./hooks";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const LoadConfig = () => {
  const { actions } = useOvermind();

  useEffect(() => {
    actions.getConfig();
  }, []);
  return null;
};

export const RuntimeProvider = ({
  providers = [],
  initializer = null,
  autoLoadConfig = true
}) => {
  const Initializer = () => (
    <>
      {initializer}
      {autoLoadConfig && <LoadConfig />}
    </>
  );

  return (
    <Runtime providers={providers} initializer={<Initializer />}>
      <App />
    </Runtime>
  );
};

export default function render(
  providers = [],
  initializer = null,
  autoLoadConfig = true
) {
  ReactDOM.render(
    <RuntimeProvider
      providers={providers}
      initializer={initializer}
      autoLoadConfig={autoLoadConfig}
    />,
    document.getElementById("root")
  );
}
