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
