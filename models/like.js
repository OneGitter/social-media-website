const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used to define the type of likeable object since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post','Comment']

    }
}, {
    timestamps: true
});

const like = mongoose.model('like',likeSchema);

module.exports = like;