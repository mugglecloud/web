import React from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import Background from "components/Background";
import VideoPopup from "components/VideoPopup";
import ScrollGroup from "containers/ScrollGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
  },
  video: {
    // maxWidth: "80%"
  },
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles();

  const matches = useMediaQuery("(max-width:600px)");
  console.log("render image video with matches", matches);

  const sources = [
    {
      src:
        "https://mugglecloud.github.io/oss/feedmusic.com/videos/introducing-feed.mp4",
      type: "video/mp4",
    },
  ];

  return (
    <ScrollGroup
      {...props}
      // onThreshold
      ref={ref}
      className={classes.root}
    >
      <Background src="https://mugglecloud.github.io/oss/feedmusic.com/images/presentation-background.jpg" />
      <VideoPopup
        className={classes.video}
        value={100}
        // onFull={}
        sources={sources}
      />
    </ScrollGroup>
  );
});
