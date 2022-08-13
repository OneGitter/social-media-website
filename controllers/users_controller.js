const User = require('../models/user');


module.exports.profile = function (req,res) {
    User.findById(req.params.id, function(err,user) {
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        });
    })
}

module.exports.update = function (req,res) {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email
        }, function (err,user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function (req,res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Code'nChat | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function (req,res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile/locals.user.id');
    }

    return res.render('user_sign_in', {
        title: "Code'nChat | Sign In"
    })
}

// get the sign up data
module.exports.create_id = function (req,res) {
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
            return res.redirect('back');
        }

    });   
}

// signin and create a session
module.exports.createSession = function (req,res) {
    return res.redirect('/users/profile');
}

module.exports.signOut = function (req,res) {
    req.logout(function (err) {
        if(err){
            console.log(`${err} while logginf out`);
        }
        return res.redirect('/');
    });
}