var log = require('debug')('silk:service');
var Promise = require("bluebird");

var data = require("../data/data");

var service = module.exports = {};

service.get = function(id) {
	log('@get, id: ' + id);
	return data("masterpiece").findOne({
		_id: id.toObjectId()
	}).then(function(doc) {
		return {
			id: doc._id,
			author: doc.author,
			paths: doc.paths
		};
	});
};

service.save = function(masterpiece) {
	log('@save, masterpiece: ' + JSON.stringify(masterpiece));
	masterpiece['createdAt'] = new Date();
	return data("masterpiece")
	.insert(masterpiece)
	.then(function(doc) {
		return {
			id: doc._id,
			author: doc.author,
			createdAt: doc.createdAt
		}
	});
}