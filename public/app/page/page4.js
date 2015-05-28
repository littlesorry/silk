define([], function() {

	var p4 = {};

	p4.pick = function(idx) {
		p4.picked = idx;
		next();
	};

	return p4;
});