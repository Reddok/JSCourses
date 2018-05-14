let Post = require('../models/post'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

class PostsHandler {

    getAllPosts(req, res, next) {
        Post.find({}, (e, posts) => {
            if (e) {
                return next(e);
            }

            res.status(200).send({data: posts});
        });
    }

    search(req ,res, next) {
        let filter = {};

        if (req.query.author) {
            filter.userId = new ObjectId(req.query.author);
        }

        if (req.query.from || req.query.to) {

            filter.createdAt = {};

            if (req.query.from) {
                filter.createdAt.$gte = req.query.from;
            }

            if (req.query.to) {
                filter.createdAt.$lte = req.query.to;
            }

        }

        console.log(filter);

        Post.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'creator'
                }
            }
        ], (e, posts) => {
            if (e) {
                return next(e);
            }

            res.status(200).send({data: posts});
        });
    }

    createPost(req, res, next) {
        let newPost = req.body;
        newPost = new Post(newPost);

        newPost.save((e, result) => {
            e && next(e);
            res.status(201).send({data: result});
        });
    }

    updatePost(req, res, next) {

        let data = req.body,
            id = req.params.id;

        Post.findById(id, (err, post)  => {

            if (err) {
                return next(err);
            }

            if (!post) {
                return next(new Error({message: 'There is no such post.'}));
            }

            if (post.userId !== req.session.userId) {
                return next(new Error({message: 'Forbidden.'}));
            }

            post.set(data);

            post.save((err, updated) => {
                if (err) {
                    return next(err);
                }

                res.status(200).send(updated);
            });

        });

    }

    deletePost(req, res, next) {

        let id = req.params.id;

        Post.findById(id, (err, post)  => {

            if (err) {
                return next(err);
            }

            if (!post) {
                return next(new Error({message: 'There is no such post.'}));
            }

            if (post.userId !== req.session.userId) {
                return next(new Error({message: 'Forbidden.'}));
            }

            post.remove((err, removed) => {
                if (err) {
                    return next(err);
                }

                res.status(200).send(removed);
            });

        });

    }

}

module.exports = PostsHandler;
