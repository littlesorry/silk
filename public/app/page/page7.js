define(['jquery', 'd3', 'nprogress', 'page4'], function($, d3, NP, p4) {

	var p7 = {};

	p7.render = function() {
		$(".page7 .t-shirt").hide().eq(p4.picked || 0).show();
        $(".page7 .input").each(function() {
            if ($(this).val() !== "") {
                $(this).addClass("changed");
            }
        });

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
       if (toUpdate) {
            $(".page7 .input1").val($(".page .input4").val() || p7.comment || "").addClass("changed");
        }
        setTimeout(function() {
            $(".step1-overlay").hide();
         }, 500);
    };

    p7.pickItem = function(idx) {
        $(".page7 .input4").val("").removeClass("changed");
        $(".page7 .msg li").removeClass("primary secondary");
        $(".page7 .msg li:nth-child(" + idx + ")").addClass("primary");
        if (idx > 1) {
            $(".page7 .msg li:nth-child(" + (idx - 1) + ")").addClass("secondary");
        }
        if (idx < $(".msg li").size()) {
            $(".page7 .msg li:nth-child(" + (idx + 1) + ")").addClass("secondary");
        }
        p7.comment = $(".page7 .msg li:nth-child(" + (idx) + ")").text();
    };

    function check() {
        var errors = [];
        if (!$(".page7 .input1").val()) {
            errors.push("请填写留言");
        }
        if (!$(".page7 .input2").val()) {
            errors.push("请填写昵称");
        }
        if ($(".page7 .input3").val() && !/1\d{10}/.test($(".page7 .input3").val())) {
            errors.push("请填写正确的手机号");
        }
        return errors;
    }

	p7.upload = function() {
        var errors = check();
        if (errors.length > 0) {
            var errMsg = errors.reduce(function(pre, cur) {
                return pre + "<br />" + cur;
            });
            $(".page7 .err").html(errMsg).show();
            setTimeout(function() {
                $(".page7 .err").hide();
            }, 2000);
            return;
        }

        if ($(".page7 .btn2").hasClass("disable")) {
            return;
        }
        $(".page7 .btn2").addClass("disable");

		var data = {
			dataURL: d3.toData()
			, tshirt: p4.picked || 0
			, comment: $(".page7 .input1").val()
			, author: $(".page7 .input2").val()
			, mobile: $(".page7 .input3").val()
		};

        NP.start();
		$.post('/masterpiece/', data).done(function(resp) {
			$(".page7 .info").show();
			setTimeout(function() {
				window.location = "/?id=" + resp.id + "#6";
			}, 2000);
		}).always(function() {
            NP.done();
            $(".page7 .btn2").removeClass("disable");
        });
	};

	return p7;
});