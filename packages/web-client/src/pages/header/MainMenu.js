import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#320d7f",
    textAlign: "center",
    fontSize: "42px",
    textTransform: "uppercase"
  }
}));

export default React.forwardRef(({ style, className }, ref) => {
  const classes = useStyles();

  return (
    <div
      ref={ref}
      style={style}
      className={[classes.root, className].join(" ")}
    ></div>
  );
});
