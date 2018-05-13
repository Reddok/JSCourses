let express = require('express'),
    UsersHandler = require('../handlers/users'),
    userHandler = new UsersHandler(),
    router = express.Router(),
    session = require('../helpers/session');

router.post('/signIn', userHandler.signIn);
router.post('/signUp', userHandler.signUp);

router.get('/', session.checkAuthentication, userHandler.getAllUsers);
router.get('/:id', session.checkAuthentication, userHandler.getUser);
router.get('/signOut', session.checkAuthentication, userHandler.signOut);

router.patch('/:id', session.checkAuthentication, userHandler.updateUser);
router.delete('/:id', session.checkAuthentication, userHandler.deleteUser);

module.exports = router;