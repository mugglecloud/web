import routes from "./routes";
import style from "./style";
import * as ui_components from "./ui_components";
import initializer from "./initializer";

export default {
  routes,
  style,
  ui_components: Object.values(ui_components),
  initializer
};
