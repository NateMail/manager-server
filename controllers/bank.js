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
