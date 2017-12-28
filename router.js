const Authencation = require("./controllers/authencation");
const PassportAuth = require("./services/passport");
const PassportLocal = require("./services/passport-local");

module.exports = function(app) {
  app.get("/", PassportAuth.requireJWTAuth, (req, res) => {
    res.send({ hi: "there" });
  });
  app.post("/signup", Authencation.signup);
  app.post("/signin", PassportLocal.localSignInAuth, Authencation.signIn);
};
