import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundVideo from "components/BackgroundVideo";
import { useStore } from "@mugglecloud/web-runtime";
import ParagraphList from "components/ParagraphList";
import ScrollGroup from "components/ScrollGroup";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: "12px solid #e6e6e6",
    background: "#000"
  }
});

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { state } = useStore();

  const { paragraphs, sources } = state.intro;

  const handleClick = () => console.log("click intro");
  const handleLow = () => console.log("low");
  const handleHigh = () => console.log("high");

  return (
    <div {...props} ref={ref} className={classes.root} onClick={handleClick}>
      <BackgroundVideo sources={sources} />
      <ScrollGroup
        min={0}
        max={paragraphs.length}
        onLow={handleLow}
        onHigh={handleHigh}
      >
        <ParagraphList paragraphs={paragraphs} />
      </ScrollGroup>
    </div>
  );
});
