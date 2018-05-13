let usersRouter = require('./users'),
    postsRouter = require('./posts');

module.exports = function (app) {

    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);


    app.use('/', (req, res) => {
        res.status(200).send('Index');
    });

    app.use((error, req, res) => {
        let status = error.status || 500,
            message = error.message;
        res.status(status).send({status, message});
    });
};