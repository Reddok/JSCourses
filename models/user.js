let mongoose = require('mongoose'),
    sha256 = require('crypto-js/sha256'),
    userSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        createdAt: {type: String, default: Date.now},
        avatar: String
    }, {collection: 'users'}),
    User;

userSchema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.password = sha256(this.password);
    }

    return next();

});

userSchema.methods.checkPassword = function checkPassword (pass) {
    return pass && sha256(pass).toString() === this.password;
};

User = mongoose.model('User', userSchema);

module.exports = User;