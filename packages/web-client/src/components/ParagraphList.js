import React from "react";
import { makeStyles } from "@material-ui/styles";

import { useScroll } from "./ScrollGroup";
import AnimationFrame from "./AnimationFrame";

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
  const ref = React.useRef();
  const classes = useStyles();
  let { count } = useScroll();

  const duration = 1000;

  const params = React.useMemo(() => {
    const scale = i => Math.pow(Math.abs(i - count), 2);
    const sign = i => (i > count ? 1 : -1);

    return {
      targets: ref.current && ref.current.querySelectorAll("p"),
      duration,
      easing: "cubicBezier(0.110, 0.880, 0.505, 0.830)",
      opacity: (el, i, l) => 1 - scale(i) / l,
      translateY: (el, i, l) => (i - count) * 60,
      scale: (el, i, l) => 1 - (sign(i) * scale(i)) / l
    };
  }, [ref, duration, count]);

  return (
    <div ref={ref} className={classes.wrapper}>
      <AnimationFrame ref={ref} params={params} />
      {paragraphs.map((text, i) => {
        return <p key={i}>{text}</p>;
      })}
    </div>
  );
};

export default ParagraphList;
