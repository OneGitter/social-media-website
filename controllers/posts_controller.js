const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.create = async function (req,res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        let user = await User.findById(post.user);

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    user_name: user.name
                },
                message: 'post created'
            });
        }

        req.flash('sucess','post created');
        return res.redirect('back');
    } catch (error) {
        req.flash('error',error);
        return;
    }
}

module.exports.destroy = async function (req,res) {
    try {
        let post = await Post.findById(req.params.id);
    
        if(post.user == req.user.id){
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
        }
        return res.redirect('back');
    } catch (error) {
        req.flash('error',error);
        return;
    }
    
}