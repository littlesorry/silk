var log = require('debug')('silk:service');
var Promise = require("bluebird");

var data = require("../data/data");

var service = module.exports = {};

data("masterpiece").count({}).then(function(count) {
	log('@load count, masterpiece: ' + count);
	service.count = count;
});

service.get = function(id) {
	log('@get, id: ' + id);
	return data("masterpiece").findOne({
		_id: id.toObjectId()
	}).then(function(doc) {
		return {
			id: doc._id,
			no: doc.no,
			author: doc.author,
			dataURL: doc.dataURL,
			favor: doc.favor,
			paths: doc.paths
		};
	});
};

service.save = function(masterpiece) {
	log('@save, masterpiece: ' + JSON.stringify(masterpiece));
	service.count += 1;
	masterpiece['no'] = service.count;
	masterpiece['favor'] = 0;
	masterpiece['createdAt'] = new Date();
	return data("masterpiece")
	.insert(masterpiece)
	.then(function(doc) {
		return {
			id: doc._id,
			no: doc.no,
			author: doc.author,
			dataURL: doc.dataURL,
			favor: doc.favor,
			createdAt: doc.createdAt
		}
	});
};

service.favor = function(id, source) {
	log('@favor, masterpiece: ' + JSON.stringify(masterpiece));
	return data("masterpiece").findOneAndUpdate({
		_id: id.toObjectId()
	}, {
		$inc: {favor: 1}
	});
};