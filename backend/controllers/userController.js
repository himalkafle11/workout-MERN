const User = require("../models/userModel");
const mongoose = require("mongoose");

//create a new user

const createUsers = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  try {
    const user = await User.create({ name, email, password, confPassword });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUsers };
