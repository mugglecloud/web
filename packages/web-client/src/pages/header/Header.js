import React from "react";
import { makeStyles } from "@material-ui/core";

import Logo from "components/Logo";
import Navigation from "./Navigation";
import ToggleButton from "./ToggleButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    padding: "46px 46px 0",
    color: "white",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    display: "block",
    zIndex: 10,
    width: 34,
    height: 34,
    color: "#fff"
  },
  nav: {
    flexGrow: 1
  },
  toggle: {
    width: 34,
    height: 34
  }
});

export default () => {
  const classes = useStyles();
  console.log(classes.root);

  return (
    <header className={classes.root}>
      <Logo className={classes.logo} fill="white" svg="/logo.svg" />
      <Navigation className={classes.nav} />
      <ToggleButton className={classes.toggle} />
    </header>
  );
};
