const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function (req,res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            post = await post.populate('user','name');
            // console.log(post);

            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created'
            });
        }

        req.flash('sucess','post created');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        req.flash('error',error);
        return;
    }
}

module.exports.destroy = async function (req,res) {
    try {
        let post = await Post.findById(req.params.id);
    
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post' });
            await Like.deleteMany({_id: {$in: post.comments}})



            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'post deleted'
                });
            }

            
        req.flash('sucess','post and associated comments deleted');
        return res.redirect('back');
        }
        else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return;
    }
    
}