const User = require('../models/user');


module.exports.profile = function (req,res) {
    res.render('user_profile',{
        title: "Profile"
    });
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
module.exports.create_id = function (req,res) {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function (err) {
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