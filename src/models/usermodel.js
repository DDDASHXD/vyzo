import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {type: String, required: [true, "Please provide an email"]},
  password: {type: String, required: [true, "Please provide a password"]},
  name: {type: String, required: [true, "Please provide a name"]},
  isVerified: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;