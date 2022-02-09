const List = require("../models/listModel");

exports.getAllList = async (req, res) => {
  try {
    const allLists = await List.find();
    res.status(200).json({
      status: "success",
      data: {
        allLists,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createList = async (req, res) => {
  try {
    const newList = await List.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        list: newList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
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
exports.updateList = async (req, res) => {
    try {
      const list = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          list
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  