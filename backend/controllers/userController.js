const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

//create a new user
const createUsers = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  let errors = [];

  if (!email || !name) {
    errors.push({ msg: "All fields must be filled!" });
  }

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      errors.push({ msg: "Email already exists!" });
    }

    if (!validator.isEmail(email)) {
      errors.push({ msg: "Email is not valid!" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password's length must be at lease six!" });
    }

    if (password !== confPassword) {
      errors.push({ msg: "Passwords do not match!" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const hashConfPassword = await bcrypt.hash(confPassword, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      confPassword: hashConfPassword,
    });

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password) {
    errors.push({ msg: "All fields must be filled!" });
    return res.status(400).json({ errors });
  }

  const user = await User.findOne({ email });

  if (!user) {
    errors.push({ msg: "Incorrect email!" });
    return res.status(400).json({ errors });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    errors.push({ msg: "Incorrect password!" });
    return res.status(400).json({ errors });
  }

  try {
    const loggedInUser = await User.login(email, password);

    const token = createToken(loggedInUser._id);
    res.status(200).json({ user: loggedInUser, token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = { createUsers, loginUsers };
