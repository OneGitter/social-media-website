const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req,res) {
    console.log(req.body.post)
    Post.findById(req.body.post,function (err,post) {
        if(err){
            console.log(`${err} while finding post`);
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            },function (err,comment) {
                if(err){
                    console.log(`${err} while adding comment`);
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }
    })
}