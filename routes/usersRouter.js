// modules
var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var router = express.Router();
const { cors, corsWithOption } = require("../middlewares/cors")

// controllers
var { getUsers, getUser, registerLocal, login, logout } = require("../controllers/usersController")

// get all registered users
router.options("*", corsWithOption, (req, res, next) => res.sendStatus(200))
router.get("/", corsWithOption, getUsers);
router.get("/me", corsWithOption, getUser);
router.post("/register", corsWithOption, registerLocal);
router.post("/login", corsWithOption, login);
router.get("/logout", corsWithOption, logout);

module.exports = router;
