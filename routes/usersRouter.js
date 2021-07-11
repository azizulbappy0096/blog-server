// modules
var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var router = express.Router();

// controllers
var { getUsers, registerLocal, login } = require("../controllers/usersController")

// get all registered users
router.get("/", getUsers);
router.post("/register", registerLocal);
router.post("/login", login);

module.exports = router;
