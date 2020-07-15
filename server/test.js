let plivo = require("plivo");
const { response } = require("express");
const client = new plivo.Client("authid", "authtoken");
module.exports = {
  sendMessage: function (to, dst, text) {
    client.messages.create(to, dst, text).then(function (message_created) {
      console.log(message_created);
    });
  },
  listMessages: function () {
    client.messages
      .list({
        limit: 5,
        offset: 0,
      })
      .then((response) => {
        console.log("response returned");

        //Prints only the message_uuid
        // console.log(response.messageUuid);
      });
  },
  getMessage: function (uid) {
    client.messages.get(uid).then((message) => {});
  },
};
