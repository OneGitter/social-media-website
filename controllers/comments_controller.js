const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.create = async function (req,res) {
    try {
        let post = await Post.findById(req.body.post);
    
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comments.push(comment);
            post.save();
        }
    
        return res.redirect('back');
    } catch (error) {
        console.log(`${error}`);
        return;
    }
    
}

module.exports.destroy = async function (req,res) {
    try {
        let comment = await Comment.findById(req.params.id)
        .populate('post');
    
        if(comment.user == req.user.id || req.user.id == comment.post.user){
            let postId = comment.post.id;
            comment.remove();
    
            await Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}});
        }
    
        return res.redirect('back');
        
    } catch (error) {
        console.log(`${error}`);
        return;
    }
}