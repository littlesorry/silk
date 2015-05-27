define(['d2'], function(d2) {
	var p5 = {};

	p5.init = function() {
        p5.d2 = window.d2 = initCanvas("canvas", {
        		debug: true
                , width: $("#canvas").width()
                , height: $("#canvas").height()
                });
        p5.undo = window.d2.undo;
        p5.clear = window.d2.clear;
	};

	return p5;
});