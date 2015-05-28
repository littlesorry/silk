define(['jquery', 'd3', 'page4'], function($, d3, p4) {

	var p7 = {};

	p7.render = function() {
		$(".page7 .t-shirt").hide().eq(p4.picked || 0).show();
        var canvas = p7.preview.canvas;
        var img = new Image();
        img.onload = function() {
            p7.preview.ctx.drawImage(img, 0, 0, $("#d3-canvas").attr("width"), $("#d3-canvas").attr("height"), 
                                        0, 0, canvas.width, canvas.height);  
        };
        img.src = d3.toData();
	};

	p7.init = function() {
		p7.preview = window.preview = initCanvas("pre-canvas", {
									debug: true
                                    , width: $("#pre-canvas").width()
                                    , height: $("#pre-canvas").height()
                                    });
	};

	return p7;
});