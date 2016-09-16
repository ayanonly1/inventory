'use strict'
var router = require('express').Router(),
    products = require('../../models/products'),
    multer  = require('multer'),
    storage,
    upload;

router.post('/', function(req, res, next) {  
    var entry,
        promise,
        timeNow = new Date().getTime();

        entry = new products({
            productId: 'pid' + timeNow,
            productName: req.body.productName,
            category: req.body.category,
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

router.get('/', function (req, res) {
    var entries,
        i,
        id = req.query.id,
        keys = req.query.keys,
        keyNames = keys && keys.split(','),
        projection = {},
        query = {};

    (id !== undefined) && (query.productId = id);
    
    if (keys !== undefined) {
        for (i = 0; i < keyNames.length; i++) {
            projection[keyNames[i]] = 1;
        }
    }

    entries = products.find(query, projection);

    entries.then(function (result) {
        console.log('Retreived Successfully!'); // jshint ignore:line
        res.status(200).json(result).end();
    })
    .catch(function (err) {
        console.log('Retreive Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});

router.delete('/', function (req, res) {
    var promise = products.remove({
        productId: req.query.id
    });

    promise.then(function () {
        console.log('Deleted Successfully!'); // jshint ignore:line
        res.status(200).end();
    }).catch(function (err) {
        console.log('Deletion Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});

router.put('/', function (req, res) {
    var body = req.body,
        promise = products.update(
            body.select,
            {
                $set: body.updateData
            });

    promise.then(function () {
        console.log('Updated Successfully!'); // jshint ignore:line
        res.status(200).end();
    }).catch(function (err) {
        console.log('Updation Failed!'); // jshint ignore:line
        console.log(err); // jshint ignore:line
        res.status(404).end();
    });
});

storage = multer.diskStorage({
  destination: './webApp/assets/img/product-image/',
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, 'pImg-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
})
 
upload = multer({ storage: storage });

router.post('/uploadPImg', upload.single('file'), function(req,res,next){
    res.send(req.file);
});

module.exports = router;
