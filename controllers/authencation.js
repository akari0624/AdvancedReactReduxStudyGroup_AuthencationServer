const UserModel = require('../models/user');

exports.signup = function(req, res, next){
  
    // See if a user with the given email exists
     const email = req.body.email;
     const password = req.body.password;
     
    if(!email || !password){

        return res.status(422).send({error:'please provide email and password'});
    }

         
    UserModel.findOne({email:email},(err,existUser)=>{

        if(err){
            return next(err);
        }
  
    // if a user with that email does exist, return an error
        if(existUser){

            return res.status(422).send({error:'email already in use...'});
        }
    
    // If a user with that email does NOT exist, create and save user record
    const user = new UserModel(
        {
            email:email,
            password:password
        }
    );

    user.save((err)=>{

        if(err){
            return next(err);
        }

// Respond to response  to indicating the user was created
        res.json({msg:`user ${email} create success`});
    });
    


   });

}