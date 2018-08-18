const db = require("../models"); //../models/index.js
const jwt = require("jsonwebtoken");

exports.signin = function() {};

exports.signup = async function(req, res, next) {
  try {
    //create user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    //create a token
    let token = jwt.sign(
      {
      id,
      username,
      profileImageUrl
      },
      //environment variable
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch(err) {
    if(err.code === 11000) {
      err.message = "Username/e-mail is already taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
