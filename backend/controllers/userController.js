const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createUsers };
