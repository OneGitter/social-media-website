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