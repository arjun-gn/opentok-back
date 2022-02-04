const express = require("express");
const router = express.Router();
const opentokController = require("../controllers/opentokSessionController");

router
  .route("/")
  .get(opentokController.startSession)
  .post(opentokController.startArchive);

router.route("/:id").get(opentokController.stopArchive);

module.exports = router;
