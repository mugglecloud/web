import React from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
    textAlign: "center"
  }
}));

export default ({ className }) => {
  const classes = useStyles();

  console.log(classes.root);

  const preventDefault = e => {
    e.preventDefault();
  };

  return (
    <Typography className={[classes.root, className].join(" ")}>
      <Link href="#" onClick={preventDefault} color="inherit">
        Link
      </Link>
      <Link href="#" onClick={preventDefault} color="inherit">
        {'color="inherit"'}
      </Link>
      <Link href="#" onClick={preventDefault} color="inherit" variant="body2">
        {'variant="body2"'}
      </Link>
    </Typography>
  );
};
