const express = require("express");
const cardControl = require("../controllers/cardController");
const listControl = require("../controllers/listController");
const router = express.Router();

router.route("/").get(listControl.getAllList).post(listControl.createList);

router
  .route("/:id")
  .patch(listControl.updateList)
  .delete(listControl.deleteList);

router.route("/cards").get(cardControl.getAllCards).post(cardControl.createCard);

router
  .route("/card/:id")
  .patch(cardControl.updateCard)
  .delete(cardControl.deleteCard);

module.exports = router;
