const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const messageSms = require("./test.js");
const plivo = require("plivo");
const app = express();

const client = new plivo.Client("authid", "authtoken");
app.use(
  cors(),
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, response, next) {
  response.contentType("application/xml");
  next();
});
app.set("port", process.env.PORT || 3001);
app.get("/messages/", function (request, response) {
  let time = request.body.Time || request.query.Time;
  console.log(time);
  client.messages
    .list({
      limit: "7",
      offset: "0",
      message_time_gte: `${time}`,
    })
    .then((rep) => {
      response.setHeader("Content-Type", "application/json");
      response.send(
        JSON.stringify({
          rep,
        })
      );
    });
});
app.get("/message/", function (req, res) {
  let uuid = req.body.Uuid || req.query.Uuid;
  //   get uuid on message
  client.messages.get(uuid).then((message) => {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        message: message,
      })
    );
  });
});
app.all("/send_sms", function (request, response) {
  let from_number = request.body.From || request.query.From;
  let to_number = request.body.To || request.query.To;
  let text = request.body.Text || request.query.Text;
  //   send SMS via plivo
  messageSms.sendMessage(from_number, to_number, text);
  //Print the message
  response.setHeader("Content-Type", "application/json");
  response.send(
    JSON.stringify({
      to: to_number,
      from: from_number,
      message: text,
    })
  );
  console.log(
    "Message received - From: " +
      from_number +
      ", To: " +
      to_number +
      ", Text: " +
      text
  );
});
app.post("/reply_sms", function (request, response) {
  let from_number = request.body.From || request.query.From;
  let to_number = request.body.To || request.query.To;
  let text = request.body.Text || request.query.Text;
  // Send details
  let rp = plivo.Response();
  let params = {
    src: to_number,
    dst: from_number,
  };
  let message_body = text;
  rp.addMessage(message_body, params);
  console.log(rp.toXML());
  response.end(rp.toXML());
});
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
