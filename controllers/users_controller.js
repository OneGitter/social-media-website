const User = require('../models/user');

// render the profile page
module.exports.profile = function (req,res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function (err,user) {
            if(user) {
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }
            else{

                return res.redirect('/users/sign-in');
            }

        } )

    }
    else{
        return res.redirect('/users/sign-in');
    }
}

// render the sign up page
module.exports.signUp = function (req,res) {
    return res.render('user_sign_up', {
        title: "Code'nChat | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function (req,res) {
    return res.render('user_sign_in', {
        title: "Code'nChat | Sign In"
    })
}

// get the sign up data
module.exports.createId = function (req,res) {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function (err,user) {
        if(err) {
            console.log(`${err} in finding user`);
            return;
        }
        if(!user){
            User.create(req.body, function (err, user) {
                if(err) {
                    console.log(`${err} in creating user`);
                    return;
                }
                
                return res.redirect('/users/sign-in');
            })
        }
        else {
            return res.redirect('/users/sign-in');
        }

    });   
}

// sign in and create a session for the user
module.exports.createSession = function (req,res) {
    //find the user
    User.findOne({email:req.body.email}, function (err,user) {
        if(err) {
            console.log(`${err} in finding user`);
            return;
        }
        // handle user found
        if(user){
            // handle password which dont match
            if(user.password != req.body.password) {
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        //handle user not found
        else{
            return res.redirect('back');
        }
    })
}

// sign out and delete session for user
module.exports.logOut = function (req,res) {
    delete req.cookies.user_id;
    return res.redirect('/users/sign-in');
}