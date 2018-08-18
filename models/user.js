const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
});

//hash the password before saving
userSchema.pre("save", async function(next) {
  try {
    if(!this.isModified("password")) {   //if the password hasn't been changed, don't hash it again
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err); //when we pass err to next it goes to our error handler
  }
});

userSchema.methods.comparePassword = async function(inputPassword, next) {
  try {
    let isMatch = await bcrypt.compare(inputPassword, this.password); //compare if user input matches saved password
    return isMatch; //if isMatch = true - login successful
  } catch(err) {
    return next(err)
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
