const Nylas = require("nylas");
require("dotenv").config();
Nylas.config({
  clientId: process.env.NYLAS_APP_CLIENT_ID,
  clientSecret: process.env.NYLAS_APP_CLIENT_SECRET,
});
const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN);

exports.getAllMessages = (req, res) => {
  nylas.messages.list().then((messages) => res.status(200).send(messages));
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
