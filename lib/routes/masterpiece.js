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
    }).error(function(e) {
    	res.json({
    		error: e
    	})
    });
});

router.post('/', function(req, res) {
	service
	.save(req.body)
	.then(function(json) {
		res.json(json);
	}).error(function(e) {
    	res.json({
    		error: e
    	})
    });
});

router.put('/favor/:id', function(req, res) {
	service.favor(req.params.id, "sessionId")
	.then(function(data) {
		res.json({
			result: data
		});
	}).error(function(e) {
    	res.json({
    		error: e
    	})
    });
});

module.exports = router;
