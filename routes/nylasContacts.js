const express = require("express");
const router = express.Router();
const contactsController = require('../controller/nylasContactsController')

router.route('').get(contactsController.getAllContacts).post(contactsController.send);

router.route('/:id').get(contactsController.getContact).patch(contactsController.updateContact).delete(contactsController.deleteContact);

module.exports = router;
