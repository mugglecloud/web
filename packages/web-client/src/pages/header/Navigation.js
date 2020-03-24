import React from "react";
import { makeStyles } from "@material-ui/core";

import Logo from "components/Logo";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999
  },
  navigation: {}
});

export default () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Logo />
    </header>
  );
};
