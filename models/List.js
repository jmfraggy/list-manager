const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    subList: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('list', ListSchema);