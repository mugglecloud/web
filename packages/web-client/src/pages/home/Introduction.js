import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundVideo from "components/BackgroundVideo";
import { useStore } from "@mugglecloud/web-runtime";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: "12px solid #e6e6e6",
    background: "#000"
  }
});

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { state } = useStore();

  const handleClick = () => console.log("click intro");

  return (
    <div {...props} ref={ref} className={classes.root} onClick={handleClick}>
      <BackgroundVideo sources={state.intro.sources} />
    </div>
  );
});
