let mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    postSchema = new mongoose.Schema({
        title: {type: String, required: true},
        text: {type: String, required: true},
        description: String,
        userId: {type: ObjectId, ref: 'User', default: null},
        createdAt: {type: String, default: Date.now},
        preview: {type: String, required: true},
    }, {collection: 'posts'}),
    Post = mongoose.model('Post', postSchema);

module.exports = Post;