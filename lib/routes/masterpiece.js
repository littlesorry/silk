var log = require('debug')('silk:router');

var express = require('express');
var router = express.Router();

var service = require('../service/masterpieceService');

//TODO: add work count method


router.get('/:id', function(req, res) {
    service
    .get(req.params.id)
    .then(function(json) {
        res.json(json);
    });
});

router.post('/', function(req, res) {
	service
	.save(req.body)
	.then(function(json) {
		res.json(json);
	});
});

module.exports = router;
