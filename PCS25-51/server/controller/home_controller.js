const User=  require('../modals/user')

module.exports.home= (req,res)=>{ // exporting the fuction so that router can use

    return res.send("hello");
};

module.exports.signIn=(req,res)=>{
    User.findOne({ email: req.body.email }, function (err, user) { // here one email is property which we are looking for
        console.log("Sign in")
        // other is user's email
        if (err) {
            console.log('error in finding user --> Passport');
            return res.status(422).json({
                error : "error"
            }); // report an error to passport

        }
                console.log(user);
        if (!user || req.body.password != user.password) {
            console.log("Invalid Username/Password");
            return res.status(422).json({
                "error" : "invalid"
            });// since there is no error bur authentication is not done
        }
        console.log("reached");
        return res.status(201).json({
            user : user
        });

    });
 
}

module.exports.signUp=(req,res)=>{

    return res.send("helloddddddddddddd");
    
}

module.exports.Create_user= (req,res)=>{
   

    //Now WE FIND USER WITH SAME ID IF IT EXIST OR NOT
        User.findOne({email: req.body.email},(err,user)=>{
            if(err){console.log('error in finding the user in db'); return res.status(422).json({
                error : "error"
            });}

        if(!user){ // if user does not exist
           
            User.create(req.body,(err,user)=>{  // creating user
                if(err){console.log('error in creating the user in db',err); return;}
                console.log("user created");
                console.log(user);
                return res.status(201).json({
                    user : user
                }) ;
            })

        }else{
            console.log('user already exist');
            return res.status(422).json({
                error : "error"
            });
        }

        })
}
//creating session when user sign in
module.exports.Create_session= (req,res)=>{
    
}