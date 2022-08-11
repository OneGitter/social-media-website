module.exports.profile = function (req,res) {
    res.render('user_profile',{
        title: "Profile"
    });
}

module.exports.home = function (req,res) {
    res.end('<h1>user</h1>');
}