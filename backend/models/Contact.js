const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactSchema = new Schema({

    userId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
        index: true,
    },

    email: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true,
    },
    
    message: {
        type: String,
        required: true,
    },

    response: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
