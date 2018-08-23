const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

messageSchema.pre("remove", async function(next) {
  try {
    //find user
    let user = await User.findById(this.user);
    //remove message id from user's message list
    user.messages.remove(this.id);
    //save user and return next
    await user.save();
    return next();
  } catch(error) {
    return next(error);
  }
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
