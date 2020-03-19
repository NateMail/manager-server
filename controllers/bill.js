const Bill = require("../models/bill");
const formidable = require("formidable");
const _ = require("lodash");

exports.createBill = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Bill could not be created"
      });
    }
    let bill = new Bill(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    bill.addedBy = req.profile._id;
    bill.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.billById = (req, res, next, id) => {
  Bill.findById(id).exec((error, bill) => {
    if (error || !bill) {
      return res.status(400).json({
        error: error
      });
    }
    req.bill = bill;
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

exports.billsByUser = (req, res) => {
  Bill.find({ addedBy: req.profile._id })
    .select("name amount due where reoccurring paid addedBy")
    .sort("_addedBy")
    .exec((error, bill) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ bill });
    });
};

exports.deleteBill = (req, res) => {
  let bill = req.bill;
  bill.remove((error, bill) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Bill deleted!"
    });
  });
};

exports.updateBill = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Bill couldn't be updated"
      });
    }
    let bill = req.bill;
    bill = _.extend(bill, fields);
    bill.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(bill);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.bill && req.auth && req.bill.addedBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleBill = (req, res) => {
  return res.json(req.bill);
};
