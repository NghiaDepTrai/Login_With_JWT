const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min:6
        },
    email: {
        type: String,
        require: true,
        min:6
    },
    password: {
        type: String,
        require: true,
        min:6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;