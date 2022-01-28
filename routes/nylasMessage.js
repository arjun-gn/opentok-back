const express = require("express");
const router = express.Router();
const messageController = require('../controller/nylasMessageController')

router.route('').get(messageController.getAllMessages).post(messageController.send);

router.route(':id').get(messageController.getMessage).patch(messageController.updateMessage).delete(messageController.deleteMessage);

module.exports = router;
