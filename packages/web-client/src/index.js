// import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import render from "@mugglecloud/web-runtime";
import routes from "./config/routes";
import style from "./config/style";
import ui_components from "./config/ui_components";

render({ routes, style, ui_components });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
