const express = require("express");
const { createUsers } = require("../controllers/userController");

const router = express.Router();

//get users
// router.get("/users", getUsers);

//post a new user
router.post("/users", createUsers);

module.exports = router;
