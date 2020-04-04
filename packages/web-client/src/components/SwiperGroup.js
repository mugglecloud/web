import React, { useMemo, createContext, useContext } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    "& > *:first-child": {
      transform: "translate3d(0, 0, 0)"
    }
  },
  swiper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    "& > *": {
      width: "inherit",
      height: "inherit"
    }
  }
}));

const SwiperContext = createContext();

export const useSwiper = () => useContext(SwiperContext);

const Swiper = React.forwardRef(
  ({ children, direction, duration, ...props }, ref) => {
    const classes = useStyles();

    const handleTransitionEnd = e => {
      console.log("transition end", direction);
    };

    const defaultStyle = useMemo(
      () => ({
        transition: `all ${duration}ms ease-out`,
        transform: "translateY(100%)"
      }),
      [duration]
    );

    const transitionStyle = { transform: `translateY(${direction * -100}%)` };
    const isActive = direction === 0;

    return (
      <SwiperContext.Provider value={{ direction }}>
        <div
          {...props}
          ref={ref}
          className={classes.swiper}
          onTransitionEnd={handleTransitionEnd}
          style={{
            ...defaultStyle,
            ...transitionStyle,
            ...{ visibility: isActive ? "visible" : "hidden" }
          }}
        >
          {children}
        </div>
      </SwiperContext.Provider>
    );
  }
);
const SwiperGroup = ({ children, className, active = 0, duration = 800 }) => {
  const groupId = useMemo(
    () =>
      Math.random()
        .toString()
        .substr(3, 4),
    []
  );
  const classes = useStyles();
  const prev = useMemo(() => ({ value: 0, element: null }), []);

  active = active < 0 ? 0 : active;

  const swipers = useMemo(
    () =>
      React.Children.map(children, (c, i) => {
        return (
          <Swiper key={`swiper-group-${groupId}-${i}`} duration={duration}>
            {React.cloneElement(c)}
          </Swiper>
        );
      }),
    [children, groupId, duration]
  );

  const direction = Math.min(1, Math.max(-1, active - prev.value));

  const handleTransitionEnd = () => {
    prev.element = activeElement;
    prev.value = active;
    console.log(prev);
  };

  const prevElement =
    prev.element &&
    React.cloneElement(prev.element, {
      direction
    });

  const activeElement = React.cloneElement(swipers[active], {
    direction: 0,
    onTransitionEnd: handleTransitionEnd
  });

  console.log(groupId, activeElement, prevElement);

  return (
    <div className={[classes.root, className].join(" ")}>
      {direction > 0 ? prevElement : null}
      {activeElement}
      {direction < 0 ? prevElement : null}
    </div>
  );
};

export default SwiperGroup;
