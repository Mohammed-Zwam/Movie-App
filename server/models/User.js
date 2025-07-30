const mongoose = require('mongoose');
const valid = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        match: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
    },
    email: {
        type: String,
        validate: {
            validator: val => valid.isEmail(val),
            message: "Invalid Email !"
        }
    },
    password: {
        type: String,
        validate: {
            validator: val => valid.isStrongPassword(val),
            message: "This is Weak Password !"
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    watchList: {
        type: Array,
        default: []
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({
        userID: this._id,
        userRole: this.role
    }, process.env.SECRET_KEY);
    return token;
}

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
