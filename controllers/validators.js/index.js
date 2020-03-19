exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createToDoValidator = (req, res, next) => {
  // title
  req.check("task", "Please put a task").notEmpty();
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createBodyValidator = (req, res, next) => {
  // height
  req.check("height", "Enter a height").notEmpty();
  req.check("height", "Height must be a number").isInt();

  // weight
  req.check("weight", "Enter a weight").notEmpty();

  // age
  req.check("age", "Enter your age").notEmpty();
  req.check("age", "Age must be a number").isInt();

  //sex
  req.check("sex", "Enter your sex").notEmpty();
  req.check("sex", "Enter a valid sex").isLength({ min: 4, max: 7 });

  //check for errors
  const errors = req.validationErrors();
  // if error show the rirst one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createBillValidator = (req, res, next) => {
  // name
  req.check("name", "Please put a name").notEmpty();

  // amount
  req.check("amount", "Please put an amount").notEmpty();
  req.check("amount", "Please enter a number").isInt();

  // due
  req.check("due", "Please enter a due date").notEmpty();
  req.check("due", "Please enter a valid date").isDate();

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.createDepositValidator = (req, res, next) => {
  // name
  req.check("name", "Please put a name").notEmpty();

  // amount
  req.check("amount", "Please put an amount").notEmpty();
  req.check("amount", "Please enter a number").isInt();

  // where
  req.check("where", "Please put and account to deposit to").notEmpty();

  // date
  req.check("date", "Please enter a date").notEmpty();
  req.check("date", "Please enter a valid date").isDate();

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
