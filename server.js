let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    connection = mongoose.connect('mongodb://localhost:27017/testDb'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    port = 8000;

connection.then(

    () => {

        console.log('Database successfully connected');

        app.set('views', './views');
        app.engine('html', require('ejs').renderFile);

        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.use(expressSession({
            name: 'testDb',
            key: 'key',
            secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
            resave: false,
            rolling: true,
            saveUninitialized: false,
            store: new MongoStore({
                url: 'mongodb://localhost:27017/testDb',
                autoReconnect: true,
                ssl: false
            }),
            cookie: {
                maxAge: 31 * 24 * 60 * 60 * 1000
            }
        }));

        require('./routes/index')(app);

        app.listen(port, () => {
            console.log('Server starts on port ' + port);
        });

    },
    error => {
        console.log('Error', err);
        process.exit(1);
    }

);


