import React, { useRef, useLayoutEffect } from "react";
// import videojs from "video.js";
import { makeStyles } from "@material-ui/core";
// import "videojs-css";
// import "video.js/dist/video-js.css";

const useStyles = makeStyles(theme => ({
  video: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    objectFit: "cover"
  }
}));

export default ({ className, sources, ...props }) => {
  const classes = useStyles();
  const ref = useRef();

  const video = ref.current;

  useLayoutEffect(() => {
    if (!video) return;
    console.log("play");
    video.play();
    return () => {
      video.pause();
      console.log("pause");
    };
  }, [video]);

  return (
    <video
      {...props}
      className={[classes.video, className].join(" ")}
      autoPlay
      loop
      muted
      ref={ref}
    >
      {sources.map(({ src, type }, i) => (
        <source key={`${src}-${type}-${i}`} src={src} type={type} />
      ))}
    </video>
  );
};
