const passport = require("passport");
const UserModel = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtOptions = {};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  //see if the user ID in the payload exists in our database
  // if it does, call 'done' with that other
  //otherwise, call done without a user object

  const id = payload.sub;
  UserModel.findOne(id)
    .then(user => {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch(err => {
      return done(err, false);
    });
});

// tell passport to use this strategy
