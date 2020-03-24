import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundVideo from "components/BackgroundVideo";
import { useStore } from "@mugglecloud/web-runtime";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "15px",
    backgroundColor: "#e6e6e6"
  }
});

export default () => {
  const classes = useStyles();

  const { state } = useStore();

  return (
    <div className={classes.root}>
      <BackgroundVideo sources={state.sources} />
    </div>
  );
};
