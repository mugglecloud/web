import React from "react";
import { TransitionGroup } from "react-transition-group";
import { makeStyles } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

import Slide from "components/Slide";
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

export default props => {
  const classes = useStyles();
  const { state } = useOvermind();

  const { active } = state.header;

  console.log(active);

  return (
    <TransitionGroup enter exit className={classes.root}>
      <Slide key={active} direction="up">
        {groups[active]}
      </Slide>
    </TransitionGroup>
  );
};
