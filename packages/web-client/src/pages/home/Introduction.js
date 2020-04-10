import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundVideo from "components/BackgroundVideo";
import { useStore } from "@mugglecloud/web-runtime";

import WheelParagraph from "./WheelParagraph";
// import ScrollGroup, { useScroll } from "containers/ScrollGroup";

const useStyles = makeStyles(({ background, border }) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    border,
    background,
  },
}));

const Introduction = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    state: {
      intro: { sources, paragraphs },
    },
  } = useStore();

  const handleClick = () => console.log("click intro");

  console.log("render instroduction");

  return (
    <div {...props} ref={ref} className={classes.root} onClick={handleClick}>
      {/* <BackgroundVideo sources={sources} /> */}
      <WheelParagraph paragraphs={paragraphs} />
    </div>
  );
});

export default React.memo(Introduction);
