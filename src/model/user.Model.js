const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UID: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    state: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role_Id: {
      type: String,
      enum: ["1", "2", "3", "4"], // 1- client(customer),2-biker(delivery person),3-seller,4-Admin
      default: "1",
    },
    notificationToken: {
      type: String,
      default: "",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
