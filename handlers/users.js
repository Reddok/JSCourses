let User = require('../models/user');

class UsersHandler {

    getAllUsers(req, res, next) {
        User.find({}, (e, users) => {
            if (e) {
                return next(e);
            }

            res.status(200).send({data: users});
        });
    }

    getUser(req, res, next) {
        let id = req.params.id;

        User.findById(id, (e, user) => {

            if (e) {
                return next(e);
            }

            if (!user) {
                return next(new Error({message: 'There is no such user!'}))
            }

            return res.status(201).send({data: user});

        });
    }

    updateUser(req, res, next) {
        let data = req.body,
            id = req.params.id;

        User.findByIdAndUpdate(id, data, {new: true}, (err, result) => {

                if (err) {
                    next(err);
                }

                res.status(201).send({data: result});
            }
        );

    }

    deleteUser(req, res, next) {
        let id = req.params.id;

        User.findByIdAndRemove(id, err => {

                if (err) {
                    next(err);
                }

                res.status(201).send({data: 'User removed successfully'});
            }
        );
    }

    signUp(req, res, next) {

        let email = req.body.email,
            password = req.body.password,
            name = req.body.name,
            avatar = req.body.avatar || null;

        User.find({email}).count((err, count) => {

            let newUser;

            if (err) {
                return next(err);
            }

            if (count) {
                return next(new Error({message: 'Email already taken'}));
            }

            newUser = new User({email, password, name, avatar});

            newUser.save((err, result) => {

                if (err) {
                    return next(err);
                }

                res.status(201).send(result);

            });

        });

    }

    signIn(req, res, next) {
        let email = req.body.email,
            pass = req.body.password;

        User.findOne({email}, (err, user) => {

            if (err) {
                return next(err);
            }

            if (!user || !user._id) {
                return next(new Error('There is no user with this credentials'));
            }

            if (!user.checkPassword(pass)) {
                return next(new Error('Password invalid!'));
            }

            req.session.userId = user._id;
            req.session.loggedIn = true;

            res.status(200).send(user);
        });
    }

    signOut(req, res, next) {
        delete(req.session.userId);
        delete(req.session.loggedIn);

        res.redirect('/');
    }

}

module.exports = UsersHandler;
