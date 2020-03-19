const Goal = require("../models/goal");
const formidable = require("formidable");
const _ = require("lodash");

exports.createGoal = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Goal could not be created"
      });
    }
    let goal = new Goal(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    goal.createdBy = req.profile._id;
    goal.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.goalById = (req, res, next, id) => {
  Goal.findById(id).exec((error, goal) => {
    if (error || !goal) {
      return res.status(400).json({
        error: error
      });
    }
    req.goal = goal;
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

exports.goalsByUser = (req, res) => {
  Goal.find({ createdBy: req.profile._id })
    .select("title description duration completed createdBy")
    .sort("_createdBy")
    .exec((error, goal) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ goal });
    });
};

exports.deleteGoal = (req, res) => {
  let goal = req.goal;
  goal.remove((error, goal) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "Goal deleted!"
    });
  });
};

exports.updateGoal = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Goal couldn't be updated"
      });
    }
    let goal = req.goal;
    goal = _.extend(goal, fields);
    goal.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(goal);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.goal && req.auth && req.goal.createdBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleGoal = (req, res) => {
  return res.json(req.goal);
};
