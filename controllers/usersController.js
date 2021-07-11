// modules
var passport = require("passport");
var User = require("../models/user");

module.exports = {
  getUsers: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    User.find({}, { salt: 0, hash: 0 })
      .then(
        (docs) => {
          res.status(200).json({
            success: true,
            payload: {
              users: docs,
            },
          });
        },
        (networkError) => next(networkError)
      )
      .catch((err) => {
        next(err);
      });
  },
  registerLocal: (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const { name, username, email, password } = req.body;

    User.register({ name, username, email }, password, (err) => {
      if (err) {
        return next(err);
      }
      passport.authenticate("local", { session: true }, (err, user, info) => {
        console.log(err, user, info);
        if (err) {
          next(err);
        } else if (!user) {
          res.status(401).json({
            success: false,
            error: info,
            payload: {},
          });
        } else {
          req.logIn(user, function (err) {
            if (err) {
              next(err);
            } else {
              res.status(200).json({
                status: "Registere successfully",
                success: true,
                payload: {
                  user: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    follwers: user.followers,
                    createdAt: user.createdAt
                  },
                },
              });
            }
          });
        }
      })(req, res, next);
    });
  },
  login: (req, res, next) => {
    passport.authenticate("local", { session: true }, (err, user, info) => {
      res.setHeader("Content-Type", "application/json");
      if (err) {
        next(err);
      } else if (!user) {
        res.status(401).json({
          success: false,
          error: info,
          payload: {},
        });
      } else {
        req.logIn(user, function (err) {
          if (err) {
            next(err);
          } else {
            res.status(200).json({
              status: "Logged in",
              success: true,
              payload: {
                user: {
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  follwers: user.followers,
                  createdAt: user.createdAt
                }
              },
            });
          }
        });
      }
    })(req, res, next);
  },
};
