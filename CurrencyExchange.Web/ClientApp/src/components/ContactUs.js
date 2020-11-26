import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 64
  }
}));

function ContactUs(props) {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleButtonClick = (event) => {
    var data = {
      title: title,
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
      <div>
        <h1 id="tableLabel" >Send us a message</h1>
      </div>
      <Grid container>
        <Grid item>
          <TextField
            id="message-title"
            label="Message title"
            required={true}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="name"
            label="name"
            required={true}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            required={true}
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="message"
            label="Message"
            required={true}
            onChange={handleMessageChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleButtonClick}
          >
            Submit message
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactUs;