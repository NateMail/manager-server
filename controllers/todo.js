const ToDo = require("../models/todo");
const formidable = require("formidable");
const _ = require("lodash");

exports.createToDo = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "Todo could not be created"
      });
    }
    let todo = new ToDo(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    todo.createdBy = req.profile._id;
    todo.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(result);
    });
  });
};

exports.toDoById = (req, res, next, id) => {
  ToDo.findById(id).exec((error, todo) => {
    if (error || !todo) {
      return res.status(400).json({
        error: error
      });
    }
    req.todo = todo;
    next();
  });
};

exports.isOwner = (req, res, next) => {
  console.log(req.profile);
  console.log(req.auth);
  let isOwner = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!isOwner) {
    return res.status(403).json({
      error: "user is not authorized"
    });
  }
  next();
};

exports.toDosByUser = (req, res) => {
  ToDo.find({ createdBy: req.profile._id })
    .select("task createdBy completed created")
    .sort("_created")
    .exec((error, todos) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json({ todos });
    });
};

exports.deleteToDo = (req, res) => {
  let todo = req.todo;
  todo.remove((error, todo) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    res.json({
      message: "todo deleted!"
    });
  });
};

exports.updateToDo = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields) => {
    if (error) {
      return res.status(400).json({
        error: "todo couldn't be updated"
      });
    }
    let todo = req.todo;
    todo = _.extend(todo, fields);
    todo.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }
      res.json(todo);
    });
  });
};

exports.isCreator = (req, res, next) => {
  let isCreator = req.todo && req.auth && req.todo.createdBy == req.auth.id;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.singleToDo = (req, res) => {
  return res.json(req.todo);
};
