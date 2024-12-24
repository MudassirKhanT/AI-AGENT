import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

//Hashing the password using bcrypt
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
//verifying the paswword with compare method
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//Creating tokens using jwt.sign()
userSchema.methods.generateJWT = async function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
};
//Exporting user model
const User = mongoose.model("user", userSchema);
export default User;
