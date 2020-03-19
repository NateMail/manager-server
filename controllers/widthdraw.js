const Widthdraw = require("../models/widthdraw");
const formidable = require("formidable");
const _ = require("lodash");

exports.createWidthdrawal = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Widthdrawal could not be created"
      });
    }
    let widthdrawal = new Widthdraw(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    widthdrawal.addedBy = req.profile._id;
    widthdrawal.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.widthdrawalById = (req, res, next, id) => {
  Widthdraw.findById(id).exec((error, widthdrawal) => {
    if (error || !widthdrawal) {
      return res.status(400).json({
        error: error
      });
    }
    req.widthdrawal = widthdrawal;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  let isOwner = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.widthdrawalsByUser = (req, res) => {
  Widthdraw.find({ addedBy: req.profile._id })
    .select("name amount where date addedBy")
    .sort("_addedBy")
    .exec((error, widthdrawal) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ widthdrawal });
    });
};

exports.deleteWidthdrawal = (req, res) => {
  let widthdrawal = req.widthdrawal;
  widthdrawal.remove((error, widthdrawal) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Widthdrawal deleted!"
    });
  });
};

exports.updateWidthdrawal = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Widthdrawal couldn't be updated"
      });
    }
    let widthdrawal = req.widthdrawal;
    widthdrawal = _.extend(widthdrawal, fields);
    widthdrawal.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(widthdrawal);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator =
    req.widthdrawal && req.auth && req.widthdrawal.addedBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleWidthdrawal = (req, res) => {
  return res.json(req.widthdrawal);
};
