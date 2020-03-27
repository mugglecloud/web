import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import { makeStyles } from "@material-ui/core";
import "video.js/dist/video-js.min.css";

const useStyles = makeStyles(theme => ({
  video: {
    width: "100%",
    height: "100%",
    "& > video": {
      width: "inherit",
      height: "inherit",
      objectFit: "contain"
    }
  }
}));

export default ({ video, ...props }) => {
  const classes = useStyles();
  const ref = useRef();

  const options = Object.assign(
    {
      autoplay: false,
      controls: true,
      loop: false,
      liveui: true
    },
    video
  );

  useEffect(() => {
    let player = null;
    if (ref.current) {
      player = videojs(ref.current, options, () => {
        console.log("onPlayerReady");
      });
    }
    return () => player && player.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <div {...props} data-vjs-player>
      <video ref={ref} className={classes.video}></video>
    </div>
  );
};
