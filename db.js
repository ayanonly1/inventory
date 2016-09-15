'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://adminims:admin9611@ds033116.mlab.com:33116/fcinventory', function () {
    console.log('mongoDb connected');
})

module.exports = mongoose;
