const List = require("../models/list");
const formidable = require("formidable");
// const _ = require("lodash");

exports.createList = (req, res, next) => {
  console.log(req.profile);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
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
