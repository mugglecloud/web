import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#320d7f",
    textAlign: "center",
    fontSize: "42px",
    textTransform: "uppercase"
  }
}));

export default ({ style, className }) => {
  const classes = useStyles();

  return (
    <div style={style} className={[classes.root, className].join(" ")}></div>
  );
};
