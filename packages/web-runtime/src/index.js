/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { RuntimeProvider } from "./containers/Runtime";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

export { useOvermind, useStore, bindScope } from "./hooks";
export { RuntimeProvider } from "./containers/Runtime";

/*
  providers: Array<{
    element: ReactElement,
    props: ReactProps
  }>

  initializer: ReactElement,

  routes: Array<{
    path: string,
    exact: boolean,
    need_auth: boolean,
    ui_components: Array<{
      name,
      props,
      component | source,
    }>
  }>

  pages: {
    auth: ReactElement,
    redirect: ReactElement,
    nomatch: ReactElement
  }

  runtime_deps: Array<{
    name,
    url
  }>
*/

export default function render(
  config = {
    providers: [],
    initializer: null,
    routes: [],
    pages: {
      auth: null,
      redirect: null,
      nomatch: null
    },
    runtime_deps: []
  }
) {
  ReactDOM.render(
    <RuntimeProvider config={config}>
      <App />
    </RuntimeProvider>,
    document.getElementById("root")
  );
}
