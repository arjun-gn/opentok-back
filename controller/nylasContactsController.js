const Nylas = require("nylas");
require("dotenv").config();
Nylas.config({
  clientId: process.env.NYLAS_APP_CLIENT_ID,
  clientSecret: process.env.NYLAS_APP_CLIENT_SECRET,
});
const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN);

exports.getAllContacts = (req, res) => {
  nylas.contacts.list().then((contacts) => res.status(200).send(contacts));
};
exports.getContact = (req, res) => {
    const contact =  nylas.contacts.find(`{${req.id}}`);
  res.status(200).send({contact});
};
exports.send = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
exports.updateContact = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
exports.deleteContact = (req, res) => {
  console.log(req.body);
  res.status(200).send({});
};
