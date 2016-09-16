'use strict'
var express = require('express')
var path = require('path');
var router = express.Router();
router.get('/', function (req, res) {
	console.log(path.resolve('webApp/index.html'));
  res.sendFile(path.resolve('webApp/index.html'));
});

router.use(/\/api\/sessions?users?/g, function (req, res, next) {
	if (!req.headers['x-auth']) {    
        return res.send(401);  
    }
});
router.use(express.static(__dirname + '/../webApp/assets/'));
router.use(express.static(__dirname + '/../webApp/templates/'));

module.exports = router;
