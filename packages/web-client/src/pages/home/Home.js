import React from "react";
import { TransitionGroup } from "react-transition-group";
import { makeStyles, Slide } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

import Intro from "./Introduction";
import ImageVideo from "./ImageVideo";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    background: "#000",
    color: "#fff",
    overflow: "hidden"
  }
}));

const groups = [
  <Intro />,
  <ImageVideo />,
  <div>group 2</div>,
  <div>group 3</div>,
  <div>group 4</div>
];

export default () => {
  const classes = useStyles();
  const { state } = useOvermind();

  const { active, direction } = state.header;

  return (
    <TransitionGroup className={classes.root}>
      <Slide
        key={active}
        timeout={{ enter: 800, exit: 0 }}
        direction={direction}
      >
        {groups[active]}
      </Slide>
    </TransitionGroup>
  );
};
