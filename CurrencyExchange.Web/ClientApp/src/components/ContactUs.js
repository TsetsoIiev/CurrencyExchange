import React from 'react';

function ContactUs(props) {

  return (
    <div>
      <div>
        <h1 id="tableLabel" >Send us a message</h1>
      </div>
      <div className="message-center">
        <p>Message</p>
        <input id="messageText" name="message"></input>
        <p>Name</p>
        <input id="nameText" name="name"></input>
        <p>Email</p>
        <input id="emailText" name="email"></input>
        <p>Message title</p>
        <input id="titleText" name="title"></input>
      </div>
      <div>
        <button id="messageSend">Send message</button>
      </div>
    </div>
  );
}

export default ContactUs;