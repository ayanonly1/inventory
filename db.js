'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminims:admin9611@ds033116.mlab.com:33116/fcinventory');

mongoose.connection.on('error', function (err) {
	error(err);
});

mongoose.connection.once('open', function () {
	console.log('mongoDB connected...');
});

module.exports = mongoose;
