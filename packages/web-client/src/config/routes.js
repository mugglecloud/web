import intro from "pages/intro";

const routes = [
  {
    path: "/",
    exact: true,
    need_auth: false,
    ui_components: [intro]
  }
];

export default routes;
