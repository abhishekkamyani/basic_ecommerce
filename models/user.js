const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    maxlength: [16, "maximum length 16 chars"],
    required: true,
  },
  lastName: {
    type: String,
    maxlength: [16, "maximum length 16 chars"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    }},
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be atleast of 8 characters"],
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    token: String
},
{versionKey: false}
);

exports.User = mongoose.model("User", userSchema);
