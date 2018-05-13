let mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        name: String,
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        createdAt: {type: String, default: Date.now},
        avatar: String
    }, {collection: 'users'}),
    User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.password = sha256(this.password);
    }

    return next();

});

userSchema.methods.checkPassword = function(pass) {
    return pass && sha256(pass) === this.password;
};

module.exports = User;