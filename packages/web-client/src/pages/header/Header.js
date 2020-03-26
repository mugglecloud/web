import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import Fade from "components/Fade";
import Logo from "components/Logo";
import Navigation from "./Navigation";
import ToggleButton from "./ToggleButton";
import MainMenu from "./MainMenu";

const useStyles = makeStyles({
  root: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    padding: "46px 46px 10px",
    color: "white",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "& > *": {
      zIndex: 10
    }
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
  },
  "main-menu": {
    zIndex: 5
  }
});

export default () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);

  const handleToggleMenu = toggled => {
    setToggle(toggled);
  };

  return (
    <header className={classes.root}>
      <Logo className={classes.logo} fill="white" svg="/logo.svg" />
      <Navigation className={classes.nav} in={!toggle} />
      <ToggleButton
        className={classes.toggle}
        deefaultValue={toggle}
        onToggle={handleToggleMenu}
      />
      <Fade in={toggle} timeout={1500}>
        <MainMenu className={classes["main-menu"]} />
      </Fade>
    </header>
  );
};
