
var User = require('../../models/user')
var jwt = require('jwt-simple');
var config = require('../../config');

function authenticate(req, res, next) {
	var token = req.headers['x-auth'],
		auth,
		status;

	try {
		auth = jwt.decode(token, config.secret);
		next();
	}
	catch (err) {
		res.send(401);
	}  
};

module.exports = authenticate;