'use strict'

var db = require('../db');

var products = db.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageLocation: {
        type: String,
        required: true
    }
});

module.exports = db.model('products', products);
