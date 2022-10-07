const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = async function (req,res) {

    try {
        
        let posts = await Post.find({}).sort('-createdAt').populate(['comments',{
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        },'user','likes']);

        // console.log(posts);

        let users = await User.find({});
        
        return res.render('home', {
            title: "Code'n Chat | Home",
            posts: posts,
            all_users: users
        });
    } catch (error) {
        console.log(`${error}`);
        return;
    }
}