import App from "pages/App/App";

const routes = [
  {
    path: "/",
    exact: true,
    need_auth: false,
    ui_components: [{ name: "app", component: App }]
  }
];

export default routes;
