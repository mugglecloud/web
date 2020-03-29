import React from "react";
import { makeStyles } from "@material-ui/styles";

import ScrollGroup, { useScroll } from "./ScrollGroup";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    top: "50%",
    height: "1.5em",
    marginTop: "-1.5em",
    fontSize: "24px",
    lineHeight: "1.5em",

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
  let { count, sign } = useScroll();

  console.log(count);

  const len = paragraphs.length;

  count = Math.max(0, Math.min(count, len));

  return (
    <div className={classes.wrapper}>
      {paragraphs.map((text, i) => {
        const style = {
          opacity: 1,
          transform: `translateY(${(i - count) * 100}%)`
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
