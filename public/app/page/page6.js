define(['jquery', 'd3', 'page5'], function($, d3, p5) {
	var p6 = {};

	p6.init = function() {
        d3.init("d3-canvas", {
            container: "#d3-container"
            , width: 320
            , height: 300
            , d2Width: p5.d2.canvas.getAttribute("width")
            , d2Height: p5.d2.canvas.getAttribute("height")});
        d3.clear();
        for (var i = p5.d2.getPaths().length - 1; i >= 0; i--) {
            d3.addMeshes(p5.d2.getPaths()[i]);
        }
	};

	p6.render = function() {
    	d3.clear();
        for (var i = p5.d2.getPaths().length - 1; i >= 0; i--) {
            d3.addMeshes(p5.d2.getPaths()[i]);
        }
	};

    p6.thinLine = function() {
        $('.page6 .sub-btn').removeClass("active").eq(0).addClass("active");
        d3.setSilkWidth(24);
        p6.render();
    };

    p6.mediumLine = function() {
        $('.page6 .sub-btn').removeClass("active").eq(1).addClass("active");
        d3.setSilkWidth(48);
        p6.render();
    };

    p6.thickLine = function() {
        $('.page6 .sub-btn').removeClass("active").eq(2).addClass("active");
        d3.setSilkWidth(64);
        p6.render();
    };

	return p6;
});