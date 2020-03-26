import React, { useMemo } from "react";
import { Transition } from "react-transition-group";

const transitionStyles = {
  entering: { opacity: 1, pointerEvents: "auto" },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, pointerEvents: "none" }
};

const Fade = ({ children, in: inProp, timeout = 300, ...rest }) => {
  const defaultStyle = useMemo(
    () => ({
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 0
    }),
    [timeout]
  );

  React.Children.only(children);

  return (
    <Transition in={inProp} timeout={timeout} {...rest}>
      {state =>
        React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...transitionStyles[state]
          }
        })
      }
    </Transition>
  );
};

export default Fade;
