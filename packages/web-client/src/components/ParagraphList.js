import React from "react";
import { makeStyles } from "@material-ui/styles";

import ScrollGroup, { useScroll } from "./ScrollGroup";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    top: "50%",
    height: "2em",
    marginTop: "-2em",
    fontSize: "24px",
    lineHeight: "2em",
    transform: "translate3d(0, -50 %, 0)",

    "& p": {
      position: "absolute",
      width: "100%",
      fontFamily: '"Avenir Next Regular",sans-serif',
      textAlign: "center",
      margin: "0 auto 5px"
    }
  }
}));

const ParagraphList = ({ paragraphs = [] }) => {
  const classes = useStyles();
  let { count } = useScroll();

  console.log(count);

  const len = paragraphs.length;

  count = Math.max(0, Math.min(count, len));

  const scale = i => Math.pow(Math.abs(i - count), 2);

  return (
    <div className={classes.wrapper}>
      {paragraphs.map((text, i) => {
        const style = {
          opacity: 1 - scale(i) / len,
          transform: `translateY(${(i - count) * 60}px) scale(${1 -
            scale(i) / len})`
        };

        return (
          <p key={i} style={style}>
            {text}
          </p>
        );
      })}
    </div>
  );
};

export default props => {
  return (
    <ScrollGroup>
      <ParagraphList {...props} />
    </ScrollGroup>
  );
};
