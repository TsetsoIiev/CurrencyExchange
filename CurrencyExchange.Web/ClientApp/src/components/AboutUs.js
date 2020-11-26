import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 64
  }
}));

function AboutUs(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>About us</h1>
    </div>
  );
}

export default AboutUs;
