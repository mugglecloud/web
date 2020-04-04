import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundVideo from "components/BackgroundVideo";
import { useStore } from "@mugglecloud/web-runtime";

import ParagraphList from "components/ParagraphList";
import ScrollGroup, { useScroll } from "containers/ScrollGroup";

const useStyles = makeStyles(({ background, border }) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    border,
    background
  }
}));

const WrappedParagraph = ({ paragraphs }) => {
  const count = useScroll();

  return <ParagraphList paragraphs={paragraphs} duration={300} count={count} />;
};

const Introduction = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    state: {
      intro: { sources, paragraphs }
    }
  } = useStore();

  const handleClick = () => console.log("click intro");

  return (
    <div {...props} ref={ref} className={classes.root} onClick={handleClick}>
      <BackgroundVideo sources={sources} />
      <ScrollGroup threshold={5} size={paragraphs.length}>
        <WrappedParagraph paragraphs={paragraphs} />
      </ScrollGroup>
    </div>
  );
});

export default React.memo(Introduction);
