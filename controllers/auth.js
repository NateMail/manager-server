const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const emailTaken = await User.findOne({ email: req.body.email });
  // check if email is taken
  if (emailTaken) {
    res.status(403).json({
      error: "Email is taken!"
    });
  }
  // create the new user
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup success! Please login." });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // find if the user exists
  User.findOne({ email }, (user, error) => {
    if (!user || error) {
      res.status(401).json({
        error: "User with that email does not exist"
      });
    }
    // find if the password matches the users
    if (!user.authenticate(password)) {
      res.status(401).json({
        error: "Password does not match user password"
      });
    }
    // create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = async (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout Success!" });
};

exports.requireSignin = expressJwt({
  // if the token is valid, express jwt appends the verified users id
  //in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
