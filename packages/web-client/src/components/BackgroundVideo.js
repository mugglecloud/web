import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import { makeStyles } from "@material-ui/core";
// import "videojs-css";
import "video.js/dist/video-js.css";

const useStyles = makeStyles(theme => ({
  video: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    "& > video": {
      width: "inherit",
      height: "inherit",
      objectFit: "cover"
    }
  }
}));

export default props => {
  const classes = useStyles();
  const ref = useRef();

  const options = Object.assign({}, props, {
    autoplay: true,
    controls: false,
    loop: true
  });

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
    <div data-vjs-player>
      <video ref={ref} className={classes.video}></video>
    </div>
  );
};
