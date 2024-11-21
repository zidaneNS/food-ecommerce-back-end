const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    shift_text: {
        type: String,
        required: true
    },
    viginere_text: {
        type: String,
        required: true
    },
    des_text: {
        type: String,
        required: true
    },
    shift_key: {
        type: Number,
        required: true
    },
    viginere_key: {
        type: String,
        required: true
    },
    des_key: {
        type: String,
        required: true
    },
    data: {
        date: {
            type: String,
            required: true
        },
        orderInfo: []
    }
})

module.exports = mongoose.model('Note', noteSchema);