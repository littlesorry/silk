define(['jquery', 'd3', 'nprogress', 'page4'], function($, d3, NP, p4) {

	var p7 = {
        scale: 10
    };

	p7.render = function() {
		$(".page7 .t-shirt").hide().eq(p4.picked || 0).show();
        $(".page7 .input").each(function() {
            if ($(this).val() !== "") {
                $(this).addClass("changed");
            }
        });

        $(".page7 .data-img").get(0).onload = function() {
            $(".page7 .data-img").show();
        };
        $(".page7 .data-img").get(0).src = d3.toData();
	};

	p7.init = function() {
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
            , scale: p7.scale
		};

        NP.start();
		$.post('/masterpiece/', data).done(function(resp) {
			$(".page7 .info").show();
			setTimeout(function() {
                $(".page7 .btn2").removeClass("disable");
				window.location = "/?id=" + resp.id + "#6";
			}, 2000);
		}).error(function() {
            $(".page7 .btn2").removeClass("disable");
        }).always(function() {
            NP.done();
        });
	};

    p7.small = function() {
        if (p7.scale > 1) {
            p7.scale -= 1;
            $(".page7 .data-img").removeClass("s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16");
            $(".page7 .data-img").addClass("s" + p7.scale);
        }
    };

    p7.full = function() {
        if (p7.scale < 19) {
            p7.scale += 1;
            $(".page7 .data-img").removeClass("s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16");
            $(".page7 .data-img").addClass("s" + p7.scale);
        }
    };

	return p7;
});