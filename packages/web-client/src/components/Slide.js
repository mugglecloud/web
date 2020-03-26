import React, { useMemo } from "react";
import { Transition } from "react-transition-group";

const transitionStyles = direction => ({
  entering: { transform: `translateY(-100%)` },
  entered: { transform: `translateY(0)` },
  exiting: { transform: `translateY(100%)` },
  exited: { transform: `translateY(100%)` }
});

export default ({
  children,
  in: inProp,
  timeout = 1000,
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

  React.Children.only(children);

  return (
    <Transition in={inProp} enter exit timeout={timeout} {...rest}>
      {state => {
        console.log(state, inProp);
        return (
          children &&
          React.cloneElement(children, {
            style: {
              ...defaultStyle,
              ...transitionStyles(direction)[state]
            }
          })
        );
      }}
    </Transition>
  );
};
