const Bank = require("../models/bank");
const formidable = require("formidable");
const _ = require("lodash");

exports.createBank = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Bank info could not be created"
      });
    }
    let bank = new Bank(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    bank.createdBy = req.profile._id;
    bank.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.bankById = (req, res, next, id) => {
  Bank.findById(id).exec((error, bank) => {
    if (error || !bank) {
      return res.status(400).json({
        error: error
      });
    }
    req.bank = bank;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  console.log(req.profile);
  console.log(req.auth);
  let isOwner = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.bankByUser = (req, res) => {
  Bank.find({ createdBy: req.profile._id })
    .select("checking saving createdBy ")
    .sort("_created")
    .exec((error, bank) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ bank });
    });
};

exports.updateBank = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "bank couldn't be updated"
      });
    }
    let bank = req.bank;
    bank = _.extend(bank, fields);
    bank.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(bank);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.bank && req.auth && req.bank.createdBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleBank = (req, res) => {
  return res.json(req.bank);
};
