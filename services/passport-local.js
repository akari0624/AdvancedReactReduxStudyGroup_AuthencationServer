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
        return done(null, false);
      }

      // compare password - is `password` equal to user.password?
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(localLogin);

exports.localSignInAuth = passport.authenticate('local',{session:false});


