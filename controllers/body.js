const Body = require("../models/body");
const formidable = require("formidable");
const _ = require("lodash");

exports.createBody = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Body was not added"
      });
    }
    let body = new Body(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    body.addedBy = req.profile._id;
    if (body.sex === "Female") {
      let weight = (body.weight[body.weight.length - 1] / 2.2) * 9.6;
      let height = body.height * 2.54 * 1.8;
      let age = body.age * 4.7;
      body.bmr = 655 + weight + height - age;
    } else if (body.sex === "Male") {
      let weight = (body.weight[body.weight.length - 1] / 2.2) * 13.7;
      let height = body.height * 2.54 * 5;
      let age = body.age * 6.8;
      body.bmr = 66 + weight + height - age;
    }
    body.tdee = body.bmr * body.activity;
    body.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};
