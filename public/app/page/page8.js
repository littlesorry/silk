define(['jquery', 'wechat'], function($, wechat) {

	function getParam(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		    results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function hasFavored(id) {
		if (typeof localStorage["favor" + id] === 'undefined') {
			return false;
		}
		return true;
	}

	var p8 = {};

	p8.render = function() {
		p8.id = null;
		var ajax;
		if (/no=/.test(window.location.search)) {
			// no search;
			var no = getParam("no");
			if (typeof no === "undefined" || no === "" || no === "undefined") {
				$(".dialog").html("无效的作品号！").show();
				setTimeout(function() {
					$(".dialog").hide();
				}, 2000);
				return;
			}
			ajax = $.getJSON("/masterpiece/no/" + no);
		} else {
			var id = getParam("id");
			if (typeof id === "undefined" || id === "" || id === "undefined") {
				$(".dialog").html("无效的作品号！").show();
				setTimeout(function() {
					$(".dialog").hide();
				}, 2000);
				return;
			}
			ajax = $.getJSON("/masterpiece/" + id);
		}

		ajax.done(function(resp) {
			if (resp.id) {
				p8.id = resp.id;
				wechat.shareTimeline(resp.id);
				$(".page8 .t-shirt").hide().eq(resp.tshirt || 0).show();
				$(".page8 .label1 span").text(resp.no);
				$(".page8 .favor span").text(resp.favor);
				$(".page8 .favor").show();

				$(".page8 .info .no").text(resp.no);
				$(".page8 .info .author").text(resp.author);
				$(".page8 .info").show();

				$(".page8 .comment").text(resp.comment).show();
				if (resp.scale) {
					$(".page8 .work").addClass("s" + resp.scale);
				}

				var img = $(".page8 .work").get(0);
				img.onload = function() {
					$(".page .work").show();
				};
				img.src = resp.dataURL;
			} else {
				$(".dialog").html("作品号不存在！").show();
				setTimeout(function() {
					$(".dialog").hide();
				}, 4000);
			}
		});
	};

	p8.favor = function() {
		var id = p8.id;
		if (typeof id === "undefined" || id === "" || id === "undefined") {
			$(".dialog").html("无效的作品号！").show();
			setTimeout(function() {
				$(".dialog").hide();
			}, 2000);
			return;
		}

		if (hasFavored(id)) {
			$(".dialog").html("请勿重复点赞！").show();
			setTimeout(function() {
				$(".dialog").hide();
			}, 2000);
			return;
		}

		$.ajax({
			url: "/masterpiece/favor/" + id
			, method: "PUT"
		}).done(function(resp) {
			localStorage["favor" + id] = 1;
			$(".page8 .favor span").text(resp.favor + 1);
			$(".page8 .msg").show();
			setTimeout(function() {
				$(".page8 .msg").hide();
			}, 2000);
		});
	};

	p8.start = function() {
		window.location = "/";
	};

	p8.goList = function() {

	};

	p8.close = function() {
		wechat.close();
	};

	return p8;
});