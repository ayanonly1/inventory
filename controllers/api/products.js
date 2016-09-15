'use strict'
var router = require('express').Router(),
    products = require('../../models/products');

router.post('/', function(req, res, next) {  
    var entry,
        promise;

        entry = new products({
            productId: 'pid' + new Date().getTime(),
            productName: req.body.productName,
            imageLocation: req.body.imageLocation
        });

        promise = entry.save();
        promise.then(function() {
            console.log('Inserted Successfully!'); // jshint ignore:line
            res.status(200).end();
        })
        .catch(function (err) {
            console.log('Failed Insertion!'); // jshint ignore:line
            console.log(err); // jshint ignore:line
            res.status(404).end();
        });
});

module.exports = router;
