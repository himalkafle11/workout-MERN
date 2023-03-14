const express = require("express");
const { createUsers, loginUsers } = require("../controllers/userController");

const router = express.Router();

//get users
// router.get("/users", getUsers);

//post a new user
router.post("/users", createUsers);

router.post("/users/login", loginUsers);

module.exports = router;
