let express = require('express'),
    PostsHandler = require('../handlers/posts'),
    postsHandler = new PostsHandler(),
    router = express.Router(),
    session = require('../helpers/session');

router.get('/', session.checkAuthentication, postsHandler.getAllPosts.bind(postsHandler));
router.post('/', session.checkAuthentication, postsHandler.createPost.bind(postsHandler));

router.patch('/:id', session.checkAuthentication, postsHandler.updatePost.bind(postsHandler));
router.delete('/:id', session.checkAuthentication, postsHandler.deletePost.bind(postsHandler));

router.get('/search', session.checkAuthentication, postsHandler.search.bind(postsHandler));

module.exports = router;