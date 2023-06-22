const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    /*userID: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },*/

    userType: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
        index: true,
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    } 
});

const User = mongoose.model("user", userSchema);

module.exports = User;
