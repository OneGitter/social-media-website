const Post = require('../models/post');
const Comment = require('../models/comment');

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
        return res.render('home', {
            title: "Code'n Chat",
            posts: posts
        });
    })
}