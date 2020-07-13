import React from "react";
// import plivo from "plivo";
let plivo = require("plivo");
const client = new plivo.Client(
  "MAMWU1M2FKMZCXMWUZOG",
  "OGU1NmY4YzlmOWNiNDVhZDU1MGQzZDhjNmMyYWE0OGU1NmY4YzlmOWNiNDVhZDU1MGQzZDhjNmMyYWE0"
);
export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      log: [],
      message: "",
    };
  }
  //   let client = new plivo.Client('MAMWU1M2FKMZCXMWUZOG','OGU1NmY4YzlmOWNiNDVhZDU1MGQzZDhjNmMyYWE0OGU1NmY4YzlmOWNiNDVhZDU1MGQzZDhjNmMyYWE0');

  //   client.messages.create(
  //     'plivo_src_number',
  //     '+15129543217',
  //     'Hello, world!'
  //   ).then(function(message_created) {
  //     console.log(message_created)
  //   });
  handleMessage = () => {
    this.setState({ message: "hello World" });
  };
  render() {
    return (
      <div className="message-container">
        <form id="form">
          <div className="input-div one">
            <div>
              <h5>Message to:</h5>
              <input
                className="input"
                type="text"
                placeholder="Only +15123421890"
              />
            </div>
          </div>
          <div className="input-div two">
            <div>
              <h5>SMS/MMS</h5>
              <textarea
                className="textarea"
                type="textArea"
                placeholder="Type here..."
              ></textarea>
            </div>
          </div>
          <input type="submit" className="btn" value="Send"></input>
        </form>
      </div>
    );
  }
}
// let plivo = require('plivo');
