import React from "react";
import { makeStyles } from "@material-ui/core";

const ScrollContext = React.createContext();

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "0 5px",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "all 500ms ease-out"
  }
}));

export default ({ children, className, ...props }) => {
  const classes = useStyles();
  const [event, setEvent] = React.useState({ count: 0, sign: 1 });
  const [count, setCount] = React.useState(0);

  const handleWheel = e => {
    const { deltaY } = e;
    const sign = Math.round(deltaY / Math.abs(deltaY));

    setCount(count + sign);
    setEvent({ sign, count: count + sign });
  };

  return (
    <div
      {...props}
      className={[classes.root, className].join(" ")}
      onWheel={handleWheel}
    >
      <ScrollContext.Provider value={event}>{children}</ScrollContext.Provider>
    </div>
  );
};

export const useScroll = () => {
  const e = React.useContext(ScrollContext);
  return e;
};
