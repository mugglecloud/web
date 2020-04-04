import React, { useEffect } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

import SwiperGroup from "components/SwiperGroup";

import mod from "./index";
import Intro from "./Introduction";
import ImageVideo from "./ImageVideo";
import CanvasImage from "./CanvasImage";
import More from "./More";

const useStyles = makeStyles(({ background, fontColor }) => ({
  root: {
    width: "100%",
    height: "100%",
    background,
    color: fontColor,
    overflow: "hidden"
  }
}));

const Home = () => {
  const classes = useStyles();
  const {
    state: {
      header: { active }
    },
    actions: {
      header: { setScope }
    }
  } = useOvermind();

  useEffect(() => {
    setScope(mod.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SwiperGroup className={classes.root} active={active} duration={800}>
        <Intro />
        <ImageVideo />
        <CanvasImage />
        <ImageVideo />
        <More />
      </SwiperGroup>
    </>
  );
};

const theme = createMuiTheme({
  background: "#000",
  // background: "#e6e6e6",
  fontColor: "#fff",
  borderColor: "#e6e6e6",
  color: "#320d7f",
  hoverColor: "#fff",
  hoverBackground: "#320d7f",
  border: "12px solid #e6e6e6"
});

export default props => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};
