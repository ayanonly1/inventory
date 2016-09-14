'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inventory', function () {
    console.log('mongoDb connected');
})

module.exports = mongoose;
