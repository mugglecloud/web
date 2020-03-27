import React from "react";
import {
  makeStyles,
  withStyles,
  Link,
  Grow,
  LinearProgress
} from "@material-ui/core";
import { useStore } from "@mugglecloud/web-runtime";

// import LinkBar from "components/LinkBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",

    "& > * + *": {
      // marginLeft: theme.spacing(3),
    },

    "& > *": {
      padding: `0 ${theme.spacing(3)}px`,
      fontSize: "15px"
    },

    "& a > *:last-child": {
      opacity: 0,
      transition: "all ease 300ms",
      transform: "translateY(5px)",
      paddingTop: "1px",
      marginTop: "3px"
    },

    "& a:hover, & a.active": {
      "& > *:last-child": {
        opacity: "1",
        transform: "translateY(0)"
      }
    }
  }
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b3b3b3"
  },
  barColorPrimary: {
    backgroundColor: "#fff"
  }
})(LinearProgress);

export default ({ className, in: inProp }) => {
  const classes = useStyles();
  const { state, actions } = useStore();

  const preventDefault = (e, active) => {
    e.preventDefault();
    actions.setActive(active);
  };

  return (
    <div className={[classes.root, className].join(" ")}>
      {state.navs.map((nav, i) => (
        <Grow
          key={nav.name}
          in={inProp}
          style={{ transformOrigin: "0 0 0" }}
          timeout={i * 500}
        >
          <Link
            onClick={e => preventDefault(e, i)}
            color="inherit"
            underline="none"
            className={i === state.active ? "active" : ""}
          >
            {nav.text}
            <ColorLinearProgress variant="determinate" value={nav.value} />
          </Link>
        </Grow>
      ))}
    </div>
  );
};
