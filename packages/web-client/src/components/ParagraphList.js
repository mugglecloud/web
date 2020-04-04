import React from "react";
import { makeStyles } from "@material-ui/styles";

// import AnimationFrame from "./AnimationFrame";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "absolute",
    width: "100%",
    top: "50%",
    height: "2em",
    marginTop: "-2em",
    fontSize: "24px",
    lineHeight: "2em",
    transform: "translate3d(0, -200%, 0)",
    boxSizing: "border-box",

    "& p": {
      position: "absolute",
      width: "100%",
      fontFamily: '"Avenir Next Regular",sans-serif',
      textAlign: "center",
      margin: "0 auto 5px"
    }
  }
}));

const ParagraphList = ({
  paragraphs = [],
  className,
  count = 0,
  duration = 800
}) => {
  const classes = useStyles();

  return (
    <div className={[classes.wrapper, className].join(" ")}>
      {paragraphs.map((text, i) => {
        const offset = Math.max(-4, Math.min(12, i - count));
        const transform = offset * 100;
        const scale = 1 - Math.pow(offset < 0 ? offset / 4 : offset / 12, 3);
        const opacity = 1 - Math.abs(offset < 0 ? offset / 4 : offset / 12);
        const style = {
          opacity,
          transform: `translateY(${transform}%) scale(${scale})`
        };
        return (
          <p style={style} key={i}>
            {text}
          </p>
        );
      })}
    </div>
  );
};

export default ParagraphList;
