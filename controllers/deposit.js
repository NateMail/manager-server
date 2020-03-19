const Deposit = require("../models/deposit");
const formidable = require("formidable");
const _ = require("lodash");

exports.createDeposit = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Deposit could not be created"
      });
    }
    let deposit = new Deposit(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    deposit.addedBy = req.profile._id;
    deposit.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.depositById = (req, res, next, id) => {
  Deposit.findById(id).exec((error, deposit) => {
    if (error || !deposit) {
      return res.status(400).json({
        error: error
      });
    }
    req.deposit = deposit;
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

exports.depositsByUser = (req, res) => {
  Deposit.find({ addedBy: req.profile._id })
    .select("name amount where date addedBy")
    .sort("_addedBy")
    .exec((error, deposit) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ deposit });
    });
};

exports.deleteDeposit = (req, res) => {
  let deposit = req.deposit;
  deposit.remove((error, deposit) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Deposit deleted!"
    });
  });
};

exports.updateDeposit = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Deposit couldn't be updated"
      });
    }
    let deposit = req.deposit;
    deposit = _.extend(deposit, fields);
    deposit.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(deposit);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.deposit && req.auth && req.deposit.addedBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleDeposit = (req, res) => {
  return res.json(req.deposit);
};
