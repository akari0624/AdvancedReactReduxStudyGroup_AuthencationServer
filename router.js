const Authencation = require('./controllers/authencation');

module.exports  = function(app){


      app.post('/signup',Authencation.signup);
      

}