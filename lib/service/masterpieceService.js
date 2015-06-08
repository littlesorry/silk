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
		if (doc) {
			return {
				id: doc._id,
				no: doc.no,
				author: doc.author,
				dataURL: doc.dataURL,
				scale: doc.scale,
				tshirt: doc.tshirt,
				mobile: doc.mobile,
				comment: doc.comment,
				favor: doc.favor,
				paths: doc.paths
			};
		} else {
			return {};
		}
	});
};

service.getByNo = function(no) {
	log('@get, no: ' + no);
	return data("masterpiece").findOne({
		no: no
	}).then(function(doc) {
		if (doc) {
			return {
				id: doc._id,
				no: doc.no,
				author: doc.author,
				dataURL: doc.dataURL,
				scale: doc.scale,
				tshirt: doc.tshirt,
				mobile: doc.mobile,
				comment: doc.comment,
				favor: doc.favor,
				paths: doc.paths
			};
		} else {
			return {};
		}
	});
};

service.count = function(no) {
	log('@exists, no: ' + no);
	return data('masterpiece').count({
		no: no
	}).then(function(count) {
		return {
			count: count
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
			scale: doc.scale,
			tshirt: doc.tshirt,
			mobile: doc.mobile,
			comment: doc.comment,
			favor: doc.favor,
			createdAt: doc.createdAt
		}
	});
};

service.favor = function(id, source) {
	log('@favor, id: ' + id);
	return data("masterpiece").findOneAndUpdate({
		_id: id.toObjectId()
	}, {
		$inc: {favor: 1}
	});
};

service.favors = function(no, offset) {
	log('@favor, no: ' + no + ', offset: ' + offset);
	(!no || no > 10) && (no = 10);
	(!offset) && (offset = 0); 
	var query = data.masterpiece._model.find({}).sort({favor: -1}).skip(offset).limit(no);
	var promise = Promise.promisify(query.exec, query);
	return promise().then(function(data) {
		log(JSON.stringify(data));
		return data;
	});
};

service.lastest = function(no, offset) {
	log('@lastest, no: ' + no + ', offset: ' + offset);
	(!no || no > 10) && (no = 10);
	(!offset) && (offset = 0);
	var query = data.masterpiece._model.find({}).sort({createdAt: -1}).skip(offset).limit(no);
	var promise = Promise.promisify(query.exec, query);
	return promise().then(function(data) {
		log(JSON.stringify(data));
		return data;
	});

};
