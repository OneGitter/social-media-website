const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (email,password,done) {
        // find a user and establish the identity
        User.findOne({email: email}, function(err,user) {
            if(err){
                console.log(`${err} while getting info from database`);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username or Password');
                return done(null,user);
            }
            return done(null,user);
        });
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user,done) {
    done(null,user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,user) {
        if(err){
            console.log(`${err} while deserializing the key`);
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req,res,next) {
    // if user is signed in go to next
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;