const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/chirper", {
  keepAlive: true
});

module.exports.User = require("./user");
