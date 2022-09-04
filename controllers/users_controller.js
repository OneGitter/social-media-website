const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = async function (req,res) {
    try {
        let user = await User.findById(req.params.id);
    
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        });
    } catch (error) {
        console.log(`${error}`);
        return;
    }
}

module.exports.update = async function (req,res) {
    try {
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function (err) {
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        if(fs.access(path.join(__dirname,'..' + user.avatar))){
                            fs.unlinkSync(path.join(__dirname,'..' + user.avatar));
                        }
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
            })

            return res.redirect('back');
        }
        else{
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(`${error}`);
        return;
    }
}

// render the sign up page
module.exports.signUp = function (req,res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/' + res.locals.user.id);
    }

    return res.render('user_sign_up', {
        title: "Code'nChat | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function (req,res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile/' + res.locals.user.id);
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
    req.flash('success', 'Logged in Sucessfully');
    return res.redirect('/');
}

module.exports.signOut = function (req,res) {
    req.logout(function (err) {
        if(err){
            console.log(`${err} while logging out`);
        }
        req.flash('success', 'Logged out Sucessfully');
        return res.redirect('/');
    });
}