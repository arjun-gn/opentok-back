const Nylas = require("nylas");
require("dotenv").config();
Nylas.config({
  clientId: process.env.NYLAS_APP_CLIENT_ID,
  clientSecret: process.env.NYLAS_APP_CLIENT_SECRET,
});
const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN);

exports.getAllContacts = (req, res) => {
  console.log('//////////////////');
  nylas.contacts.list().then((contacts) => res.status(200).send(contacts));
};
exports.getContact = async (req, res) => {
  console.log(req.params.id);
    try{
      const contact = await  nylas.contacts.find();
      res.status(200).send(res);
    }catch(err)
    {
      console.log(err,"====");
      res.status(401).send({});
    }
   
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
