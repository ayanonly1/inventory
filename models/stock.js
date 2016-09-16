'use strict'

var db = require('../db');

var stock = db.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = db.model('stock', stock);
