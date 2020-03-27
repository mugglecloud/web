import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Background from "components/Background";
import VideoPopup from "components/VideoPopup";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background: "#000",
    transform: "matrix(1, 0, 0, 1, 0, 0)",
    overflow: "hidden"
  },
  video: {}
});

export default React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <div {...props} ref={ref} className={classes.root}>
      <Background src="http://www.feedmusic.com/images/presentation-background.jpg" />
      <VideoPopup className={classes.video} />
    </div>
  );
});
