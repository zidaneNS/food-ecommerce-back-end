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
    data: {
        date: {
            type: String,
            required: true
        },
        orderInfo: {
            order: [],
            total: {
                type: Number,
                required: true
            }
        }
    }
})

module.exports = mongoose.model('Note', noteSchema);