const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = function (req,res) {

    Post.find({})
    .populate('user')
    .populate({path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function (err,posts) {
        if(err){
            console.log(`${err} while fetching posts`);
            return;
        }
        User.find({},function (err,user) {

            return res.render('home', {
                title: "Code'n Chat",
                posts: posts,
                all_users: user
            });
        })

    })
}