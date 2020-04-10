import React, { useEffect } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useOvermind, useStore } from "@mugglecloud/web-runtime";

import SwiperGroup from "components/SwiperGroup";
import ScrollDown from "components/ScrollDown";
import Visible from "components/Visible";
import Wheel, { useWheel } from "components/Wheel";

import Intro from "./Introduction";
import ImageVideo from "./ImageVideo";
import CanvasImage from "./CanvasImage";
import More from "./More";
import Why from "./Why";

const theme = createMuiTheme({
  background: "#000",
  // background: "#e6e6e6",
  fontColor: "#fff",
  borderColor: "#e6e6e6",
  color: "#320d7f",
  hoverColor: "#fff",
  hoverBackground: "#320d7f",
  border: "12px solid #e6e6e6",
});

const useStyles = makeStyles(({ background, fontColor }) => ({
  root: {
    width: "100%",
    height: "100%",
    background,
    color: fontColor,
    overflow: "hidden",
  },
}));

const groups = [<Intro />, <ImageVideo />, <CanvasImage />, <Why />, <More />];

const SwiperHandler = (props) => {
  const { event, id } = useWheel();

  console.log(id, event && event.deltaY);
  return null;
};

const Home = () => {
  const classes = useStyles();
  const ctx = useStore();
  const { state, actions } = useOvermind();

  useEffect(() => {
    actions.header.init({ navs: ctx.state.navs });
  }, [ctx.state.navs, actions.header]);

  const duration = 800;

  return (
    <SwiperGroup
      className={classes.root}
      active={state.header.active}
      duration={duration}
    >
      {groups.map((g, i) => {
        if (state.header.active === i) {
          setTimeout(() => {
            actions.header.clearNavigating();
          }, duration);
        }

        return (
          <React.Fragment key={i}>
            <Visible
              visible={state.header.active === i}
              direction={state.header.active - i}
            >
              <Wheel>
                <SwiperHandler />
                {g}
              </Wheel>
              {i < groups.length - 1 && (
                <ScrollDown onClick={() => actions.header.next(1)}></ScrollDown>
              )}
            </Visible>
          </React.Fragment>
        );
      })}
    </SwiperGroup>
  );
};

export default (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};
