'use strict' 
var router = require('express').Router(), // jshint ignore:line
    stock = require('../../models/stock'), // jshint ignore:line
    products = require('../../models/products'); // jshint ignore:line

/**
 * @description - To insert new stocks details via POST Request
 * @api-link - http://localhost:<PORT>/api/stock/
 * @return - onSuccess - 200, onError - 404
 * @example - http://localhost:<PORT>/api/stock/
            { id={String}, qty={Number} }
 */
router.post('/', function(req, res, next) {  
    var entry,
        promise;
        entry = new stock({
            productId: req.body.id,
            quantity: req.body.qty,
        });

        promise = entry.save();
        promise.then(function() {
            console.log('stock: Inserted Successfully!'); // jshint ignore:line
            res.status(200).end();
        })
        .catch(function (err) {
            console.log('stock: Failed Insertion!'); // jshint ignore:line
            console.log(err); // jshint ignore:line
            res.status(404).end();
        });
});

/**
 * @description - To get stocks details via GET Request
 * @api-link - http://localhost:<PORT>/api/stock/
 * @return  {JSON} - { "productId": {String}, "quantity": {Number} }
 * @example - http://localhost:<PORT>/api/stock/?id={String}
 */
router.get('/', function (req, res) {
    var entries,
        pid = req.query.id,
        query = {};

    (pid !== undefined) && (query.productId = pid);
    
    entries = stock.find(query);

    entries.then(function (result) {
        console.log('stock: Retreived Successfully!'); // jshint ignore:line
        res.status(200).json(result).end();
    })
    .catch(function (err) {
        console.log('stock: Retreive Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});


/**
 * @description - To delete a particular stock details by id via DELETE Request
 * @api-link - http://localhost:<PORT>/api/stock/
 * @return - onSuccess - 200, onError - 404
 * @example - http://localhost:<PORT>/api/stock/?id={String}
 */
router.delete('/', function (req, res) {
    var promise = stock.remove({
        productId: req.query.id
    });

    promise.then(function () {
        console.log('stock: Deleted Successfully!'); // jshint ignore:line
        res.status(200).end();
    }).catch(function (err) {
        console.log('stock: Deletion Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});

/**
 * @description - To update a particular stock details by id via DELETE Request
 * @api-link - http://localhost:<PORT>/api/stock/
 * @return - onSuccess - 200, onError - 404
 * @example - http://localhost:<PORT>/api/stock/?id={String}
 */
router.put('/', function (req, res) {
    var body = req.body,
        promise = stock.update( body.select, { $set: body.updateData });

    promise.then(function () {
        console.log('stock: Updated Successfully!'); // jshint ignore:line
        res.status(200).end();
    }).catch(function (err) {
        console.log('stock: Updation Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});

router.get('/test', function(req, res){
    var entries,
        pid = req.query.id,
        query = {};

    (pid !== undefined) && (query.productId = pid);
    
    entries = products.aggregate([{
        $lookup: {
                from: "stock",
                localField: "productId",
                foreignField: "productId",
                as: "stock"
            }
    }]);

    entries.then(function (result) {
        console.log('stock: Retreived Successfully!'); // jshint ignore:line
        res.status(200).json(result).end();
    })
    .catch(function (err) {
        console.log('stock: Retreive Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });



});

module.exports = router; // jshint ignore:line


