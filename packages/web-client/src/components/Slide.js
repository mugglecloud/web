import React, { useMemo } from "react";
import { Transition } from "react-transition-group";

const transitionStyles = direction => ({
  entering: { transform: `translateY(${direction === "up" ? 100 : -100}%)` },
  entered: { transform: `translateY(0)` },
  exiting: { transform: `translateY(0)` },
  exited: { transform: `translateY(${direction === "up" ? 100 : -100})` }
});

export default ({
  children,
  in: inProp,
  timeout = 300,
  direction = "up",
  ...rest
}) => {
  const defaultStyle = useMemo(
    () => ({
      transition: `all ${timeout}ms ease-in-out`,
      transform: `translateY(0)`
    }),
    [timeout]
  );

  // React.Children.only(children);

  return (
    <Transition in={inProp} timeout={timeout} {...rest}>
      {state =>
        children &&
        React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...transitionStyles(direction)[state]
          }
        })
      }
    </Transition>
  );
};
