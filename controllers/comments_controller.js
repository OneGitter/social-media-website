const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

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

module.exports.destroy = function (req,res) {
    Comment.findById(req.params.id)
    .populate('post')
    .exec(

        function (err,comment) {
            if(err){
                console.log(`${err} while deleting comment`);
                return;
            }
            console.log(`${comment.post.user}`);
            if(comment.user == req.user.id || req.user.id == comment.post.user){
                let postId = comment.post.id;
                comment.remove();
        
                Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}}, function(err,post) {
                    return res.redirect('back');
                })
            }
            else{
                    return res.redirect('back');
            }
        }
    )
    
    
    
    
    
}