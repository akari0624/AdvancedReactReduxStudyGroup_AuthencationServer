const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/user");

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: "no such user" });
      }

      // compare password - is `password` equal to user.password?
      user
        .comparePassword(password)
        .then(isMatch => {
          if (!isMatch) {
            console.log("is not match");
            return done(null, false, {
              message: "account or password is wrong"
            });
          }
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(localLogin);

exports.localSignInAuth = passport.authenticate("local", { session: false });
