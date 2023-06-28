const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET_STRING } = process.env;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Name!"],
    unique: false,
  },
  emailId: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

const userModel = mongoose.model("Users", UserSchema);

const checkUserExistInDB = async (emailId, getPassword) => {
  try {
    const user = await userModel.findOne({ emailId });
    const { name, emailId: emailAddress, password } = user;
    if (!user) {
      return { success: false, errorMessage: "user Doesnt exist" };
    }
    return {
      success: true,
      document: {
        name,
        emailId: emailAddress,
        password: getPassword ? password : null,
      },
    };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
};

const isPasswordMatching = async (password, savedUserPassword) => {
  return await bcrypt.compare(password, savedUserPassword);
};

const createUserInDB = async (name, emailId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const doc = new userModel({
      name,
      emailId,
      password: hashedPassword,
    });

    const user = await doc.save();
    return { success: true, document: user };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
};

const getAllUserExceptCurrentUserDB = async (emailId) => {
  try {
    const projection = { _id: 0, password: 0, __v: 0 };
    const users = await userModel
      .find({
        emailId: { $ne: emailId },
      })
      .select(projection);
    if (users.length === 0) {
      return {
        success: false,
        errorMessage: "Got no users :(",
      };
    }
    return {
      success: true,
      document: users,
    };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
};

const createJWTToken = async ({ emailId }) => {
  return await jwt.sign(
    {
      emailId: emailId,
    },
    JWT_SECRET_STRING,
    { expiresIn: "24h" }
  );
};

module.exports = {
  checkUserExistInDB,
  isPasswordMatching,
  createUserInDB,
  createJWTToken,
  getAllUserExceptCurrentUserDB,
};
