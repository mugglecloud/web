import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "@mugglecloud/web-runtime";
import Background from "components/Background";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background: "#000",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
    overflow: "hidden"
  }
});

export default props => {
  const classes = useStyles();

  const handleClick = () => console.log("video popup");

  return (
    <div {...props} className={classes.root} onClick={handleClick}>
      <Background src="http://www.feedmusic.com/images/presentation-background.jpg" />
    </div>
  );
};
