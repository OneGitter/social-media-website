const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const env = require('../../../config/environment')


module.exports.createSession = async function (req,res) {
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password !=req.body.password){
            return res.json(422,{
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful , here is your token',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_key, {expiresIn: '100000'})
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}