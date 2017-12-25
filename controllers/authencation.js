const UserModel = require("../models/user");
const config = require("../config");
const jwt = require("jwt-simple");

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timeStamp
    },
    config.secrect
  );
}

exports.signup = function(req, res, next) {
  // See if a user with the given email exists
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "please provide email and password" });
  }


  UserModel.findOne({ email: email })
    .then(existUser => {
      // if a user with that email does exist, return an error
      if (existUser) {
        return res.status(422).send({ error: "email already in use..." });
      }

      // If a user with that email does NOT exist, create and save user record
      const user = new UserModel({
        email: email,
        password: password
      });

      user
        .save()
        .then(
          // Respond to response  to indicating the user was created
          res.json({ token: tokenForUser(user) })
        )
        .catch(err => {
          return next(err);
        });
    })
    .catch(err => {
      if (err) {
        return next(err);
      }
    });
};
