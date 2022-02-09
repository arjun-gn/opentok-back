const Card = require("../models/cardModel");
const List = require("../models/listModel");

exports.getAllCards = async (req, res) => {
  try {
    const allcards = await Card.find();
    res.status(200).json({
      status: "success",
      data: {
        allcards,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        card: newCard,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateCard = async (req, res) => {
    try {
      const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          card
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  