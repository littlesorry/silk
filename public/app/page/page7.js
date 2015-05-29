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

    p7.showPick = function() {
        $(".step1-overlay").show();
    };
    p7.hidePick = function(toUpdate) {
        setTimeout(function() {
            $(".step1-overlay").hide();
            if (toUpdate) {
                $(".page7 .input1").val(p7.comment || "").addClass("changed");
            }
        }, 300);
    };
    p7.pickItem = function(idx) {
        $(".msg li").removeClass("primary secondary");
        $(".msg li:nth-child(" + idx + ")").addClass("primary");
        if (idx > 1) {
            $(".msg li:nth-child(" + (idx - 1) + ")").addClass("secondary");
        }
        if (idx < $(".msg li").size()) {
            $(".msg li:nth-child(" + (idx + 1) + ")").addClass("secondary");
        }
        p7.comment = $(".msg li:nth-child(" + (idx) + ")").text();
    };

	p7.upload = function() {
		var data = {
			dataURL: d3.toData()
			, tshirt: p4.picked || 0
			, comment: $(".page7 .input1").val()
			, author: $(".page7 .input2").val()
			, mobile: $(".page7 .input3").val()
		};

		$.post('/masterpiece/', data).done(function(resp) {
			$(".page7 .info").show();
			setTimeout(function() {
				// TODO
				window.location = "/?id=" + resp.id + "#6"
			}, 2000);
		});
	};

	return p7;
});