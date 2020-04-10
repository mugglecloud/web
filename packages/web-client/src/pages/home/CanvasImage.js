import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { useStore } from "@mugglecloud/web-runtime";

import ScrollGroup, { useScroll } from "containers/ScrollGroup";
import Canvas from "components/Canvas";
import SwiperGroup, { useSwiper } from "components/SwiperGroup";

const useStyles = makeStyles(({ border, color }) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    transition: "all 800ms ease",
    border,

    "& > *": {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      transition: "inherit",
    },
  },
  opened: {
    "& > *:first-child": {
      transform: "translateX(0)",
    },
    "& > *:last-child": {
      transform: "translateX(16%)",
    },
  },
  swiperContainer: {
    zIndex: 10,
    transform: "translateX(-100%)",
    width: "33.33%",
  },
  info: {
    position: "relative",
    overflow: "hidden",
    "& > *": {
      position: "absolute",
      bottom: 0,
      padding: "50px",
      color,
      fontSize: "20px",
    },
  },
  divider: {
    marginTop: "36px",
    height: "5px",
    backgroundColor: color,
  },
  canvas: {
    zIndex: 1,
  },
}));

const CanvasInfo = ({ children, style, breakpoint, duration, ...rest }) => {
  const classes = useStyles();
  const { backgroundColor = "inherit", text } = breakpoint;
  const { direction } = useSwiper();

  const dividerStyle = {
    transition: `transform ${duration}ms ease-out`,
    transform: `translateX(${direction * 100}%)`,
  };

  return (
    <div
      {...rest}
      style={Object.assign({ backgroundColor }, style)}
      className={classes.info}
    >
      <div>
        <p>{text}</p>
        <Divider style={dividerStyle} classes={{ root: classes.divider }} />
      </div>
    </div>
  );
};

const CanvasImageList = (props) => {
  const classes = useStyles();
  const count = useScroll();
  const {
    state: {
      spotlight: { start, breakpoints },
    },
  } = useStore();

  // const bp = breakpoints.find(v => v.start <= count && count <= v.end);
  const active = breakpoints.findIndex(
    (v) => v.start <= count && count <= v.end
  );
  const opened = count > start;

  const src = `https://mugglecloud.github.io/oss/feedmusic.com/images/frame-high/${
    count + 1
  }.jpg`;

  const classNames = [classes.root];
  if (opened) {
    classNames.push(classes.opened);
  }

  const duration = 800;

  return (
    <div className={classNames.join(" ")}>
      <SwiperGroup
        className={classes.swiperContainer}
        active={active}
        duration={duration}
      >
        {breakpoints.map((v, i) => {
          return (
            <CanvasInfo
              key={`ani-swiper-${i}`}
              breakpoint={v}
              duration={duration}
            />
          );
        })}
      </SwiperGroup>

      <Canvas width="1280" height="720" src={src} className={classes.canvas} />
    </div>
  );
};

export default React.forwardRef((props, ref) => {
  const {
    state: {
      spotlight: { size },
    },
  } = useStore();

  const handleScroll = (v) => {};

  return (
    <ScrollGroup
      {...props}
      size={size}
      // value={current.value}
      onScroll={handleScroll}
      // onThreshold={next}
      ref={ref}
    >
      <CanvasImageList />
    </ScrollGroup>
  );
});
