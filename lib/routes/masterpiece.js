var log = require('debug')('silk:router');

var express = require('express');
var router = express.Router();
var Promise = require('bluebird');


var service = require('../service/masterpieceService');

router.get('/favors', function(req, res) {
    service.favors(req.query.no, req.query.offset)
    .then(function(data) {
        res.json(data);
    }).error(function(e) {
        res.json({
            error: e
        });
    });
});

router.get('/lastest', function(req, res) {
    service.lastest(req.query.no, req.query.offset)
    .then(function(data) {
        res.json(data);
    }).error(function(e) {
        res.json({
            error: e
        });
    });
});

router.get('/count', function(req, res) {
    service.counts(req.query.no)
    .then(function(data) {
        res.json(data);
    }).error(function(e) {
        res.json({
            error: e
        });
    });
});

router.get('/no/:no', function(req, res) {
    service
    .getByNo(req.params.no)
    .then(function(json) {
        res.json(json);
    }).error(function(e) {
        res.json({
            error: e
        });
    });
});

router.get('/:id', function(req, res) {
    service
    .get(req.params.id)
    .then(function(json) {
        res.json(json);
    }).error(function(e) {
    	res.json({
    		error: e
    	});
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
    	});
    });
});

router.put('/favor/:id', function(req, res) {
    console.log("/favor, session: " + req.session);
	service.favor(req.params.id, req.session)
	.then(function(data) {
		res.json({
			favor: data.favor
		});
	}).error(function(e) {
    	res.json({
    		error: e.message
    	});
    });
});

router.get('/_force-favor/:no/:value', function(req, res) {
    service
        .forceFavor(req.params.no, req.params.value)
        .then(function(data) {
            res.json({
                favor: data.favor
            });
        }).error(function(e) {
            res.json({
                error: e
            });
        });
});

module.exports = router;
