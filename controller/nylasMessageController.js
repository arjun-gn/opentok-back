const Nylas = require("nylas");
require("dotenv").config();
Nylas.config({
  clientId: process.env.NYLAS_APP_CLIENT_ID,
  clientSecret: process.env.NYLAS_APP_CLIENT_SECRET,
});
const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN);

exports.getAllMessages = (req, res) => {
  nylas.messages.list().then((messages) => 
  res.status(200).send(messages)
  );

  // request("https://api.nylas.com/messages", {
  //   method: "GET",
  //   headers: {
  //     Accept: " application/json",
  //     Authorization: "Bearer" + "g5D9TvVPnV7cGgYG4Xwxci66cRiy1F",
  //     "Content-Type": "application/json",
  //   },
  //   function(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       console.log("body:", body);
  //       res.status(200).send(body);
  //     } else {
  //       console.log("error", error, response && response.statusCode);
  //     }
  //   }
  // });
};
exports.getMessage = (req, res) => {
  res.status(200).send({});
};
exports.send = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
exports.updateMessage = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
exports.deleteMessage = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
