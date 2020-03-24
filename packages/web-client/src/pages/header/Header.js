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
  logo: {
    top: "46px",
    left: "46px",
    display: "block",
    zIndex: 10
  }
});

export default () => {
  const classes = useStyles();
  console.log(classes.root);

  return (
    <header className={classes.root}>
      <Logo className={classes.logo} />
    </header>
  );
};
