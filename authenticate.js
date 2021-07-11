// modules
const passport = require("passport");
const User = require("./models/user");

// strategies
const LocalStrategy = require("passport-local").Strategy;

// set up local strategy
exports.Local = passport.use(new LocalStrategy({session: true},User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user._id)
});
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



