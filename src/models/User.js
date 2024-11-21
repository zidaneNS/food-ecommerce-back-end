const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roles: {
        user: {
            type: Number,
            default: 2001
        },
        admin: Number
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);