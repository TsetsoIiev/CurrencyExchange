import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 64
  },
  grid: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "cetner"
  },
  item: {
    paddingTop: "2%",
    paddingBottom: "2%"
  },
  paper: {
    padding: "2%"
  },
  label: {
    paddingTop: "1%",
    paddingBottom: "1%"
  }
}));

function ContactUs(props) {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleMessageChange = (event) => {
    if (event.target.value.length > 200) {
      return;
    }

    setMessage(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleButtonClick = (event) => {
    var data = {
      email: email,
      name: name,
      message: message
    };

    axios.post("https://localhost:44306/api/Message/SendMessage", data)
      .then(res => {
        console.log(res);
      });
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item className={classes.label} >
          <h3 id="tableLabel" >Send us a message</h3>
        </Grid>
        <Paper className={classes.paper}>
          <Grid item className={classes.item}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              required={true}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required={true}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              id="message"
              label="Message"
              variant="outlined"
              value={message}
              required={true}
              multiline
              rows={6}
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid item className={classes.item}>
            <Button
              variant="contained"
              onClick={handleButtonClick}
            >
              Submit message
          </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default ContactUs;