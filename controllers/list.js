const List = require("../models/list");
const formidable = require("formidable");
const _ = require("lodash");

exports.createList = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "List could not be created"
      });
    }
    let list = new List(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    list.createdBy = req.profile._id;
    list.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.listById = (req, res, next, id) => {
  List.findById(id).exec((error, list) => {
    if (error || !list) {
      return res.status(400).json({
        error: error
      });
    }
    req.list = list;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  let isOwner = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(isOwner);
  if (!isOwner) {
    return res.status(403).json({
      error: "user is not authorized"
    });
  }
  next();
};

exports.listsByUser = (req, res) => {
  List.find({ createdBy: req.profile._id })
    .select("title created tasks")
    .sort("_created")
    .exec((error, lists) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ lists });
    });
};

exports.deleteList = (req, res) => {
  let list = req.list;
  list.remove((error, list) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "List deleted!"
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.list && req.auth && req.list.createdBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleLift = (req, res) => {
  return res.json(req.list);
};
