
class Session {

    checkAuthentication (req, res, next) {
        let error;

        if (req.session && req.session.userId && req.session.loggedIn) {
            return next();
        }

        error = new Error();

        error.message = 'Unauthorized';
        error.status = 401;

        next(error)
    }

};

module.exports = new Session();