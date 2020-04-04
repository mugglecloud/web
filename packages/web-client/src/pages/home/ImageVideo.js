import React from "react";
import { makeStyles } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

import Background from "components/Background";
import VideoPopup from "components/VideoPopup";
import ScrollGroup from "containers/ScrollGroup";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background
  },
  video: {
    maxWidth: "80%"
  }
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { actions } = useOvermind();

  return (
    <ScrollGroup {...props} ref={ref} className={classes.root}>
      <Background src="http://www.feedmusic.com/images/presentation-background.jpg" />
      <VideoPopup
        className={classes.video}
        value={100}
        onFull={actions.header.setShow}
      />
    </ScrollGroup>
  );
});
