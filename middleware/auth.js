require("dotenv").load();
const jwt = require("jsonwebtoken");

//check if user is logged in - authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(error, payload) {
      if(payload) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please Log In"
        });
      }
    });
  } catch(error) {
    return next({
      status: 401,
      message: "Please Log In"
    });
  }
};

//check if correct user is logged in - authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(error, payload) {
      if(payload && payload.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "You are not authorized for this action"
        });
      }
    });
  } catch(error) {
    return next({
      status: 401,
      message: "You are not authorized for this action"
    });
  }
};
