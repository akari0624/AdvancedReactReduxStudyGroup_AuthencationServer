const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// on save hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  const user = this;
  console.log("into save...", this);
  // gen the salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // hash(encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

const ModelClass = mongoose.model("user", userSchema);

// export the model

module.exports = ModelClass;
