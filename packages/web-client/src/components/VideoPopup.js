import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Transition } from "react-transition-group";

import VideoPlayButton from "./VideoPlayButton";
import CloseButton from "./CloseButton";
import Video from "./Video";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, 50%) scale(1.5)",
    width: "680px",
    height: "300px",
    border: "12px solid #35017F",
    backgroundColor: "rgba(0,0,0,.4)",
    boxSizing: "border-box",
    transition: `opacity 1s ease-in-out, transform 1s ease-in, all .6s ease-in`,
    opacity: 1
  },
  wrapper: {
    opacity: 1,
    position: "relative",
    overflow: "hidden"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: "63px 30px",
    fontSize: "38px",
    color: "#fff",
    textAlign: "center",

    "& > p": {
      transform: "matrix(1, 0, 0, 1, 0, 0)",
      margin: "0"
    }
  },
  overlay: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 1,
    backgroundColor: "#000"
  }
}));

const transitionStyles = {
  entering: { opacity: 1, transform: "translate(-50%, -50%)" },
  entered: { opacity: 1, transform: "translate(-50%, -50%)" },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

const enterTimeout = 1000;

export default props => {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  const [videoPlay, setVideoPlay] = useState(false);
  const [full, setFull] = useState(props.full);

  const style = full
    ? {
        width: "100%",
        height: "100%"
      }
    : {};

  const toggleFull = isFull => {
    setFull(isFull);
    setVisible(false);

    setTimeout(() => {
      setVisible(!isFull);
      setVideoPlay(isFull);
    }, enterTimeout);

    props.onFull && props.onFull(!isFull);
  };

  const videoOptions = {
    autoplay: true,
    sources: [
      {
        src: "http://www.feedmusic.com/videos/introducing-feed.mp4",
        type: "video/mp4"
      }
    ]
  };

  return (
    <Transition in appear enter timeout={{ enter: enterTimeout }}>
      {state => (
        <div
          style={{
            ...style,
            ...transitionStyles[state]
          }}
          className={[classes.root, props.className].join(" ")}
        >
          {visible && !full && (
            <div className={classes.wrapper}>
              <div className={classes.content}>
                <VideoPlayButton onClick={() => toggleFull(true)} />
                <p>Introducing Feed</p>
              </div>
            </div>
          )}
          {full && (
            <>
              <div className={classes.overlay}>
                {videoPlay && <Video video={videoOptions} />}
              </div>
              <CloseButton onClick={() => toggleFull(false)} />
            </>
          )}
        </div>
      )}
    </Transition>
  );
};
