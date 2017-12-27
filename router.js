const Authencation = require("./controllers/authencation");
const PassportAuth = require("./services/passport");


module.exports = function(app) {
  app.get("/", PassportAuth.requireJWTAuth, (req, res) => {
    res.send({ hi: "there" });
  });
  app.post("/signup", Authencation.signup);
};
