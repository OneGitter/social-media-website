const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// using new strat for google oauth
passport.use(new googleStrategy({
        clientID: "1075885633654-uu0nu4vm0nid5jno6qsphtatdj4d1k5a.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        // find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log(`Error in google strategy-passport ${err}`);
                return;
            }


            console.log(profile);
            // if found set user as req.user
            if(user){
                console.log('user found');
                return done(null,user);
            }
            else{
                // else create the user then set as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log(`Error in google strategy-passport ${err}`);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }
));


module.exports = passport;