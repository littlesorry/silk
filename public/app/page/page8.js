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
		var id = getParam("id");
		if (typeof id === "undefined" || id === "" || id === "undefined") {
			$(".dialog").html("无效的作品号！").show();
			setTimeout(function() {
				$(".dialog").hide();
			}, 2000);
			return;
		}

		$.getJSON("/masterpiece/" + id)
		.done(function(resp) {
			wechat.shareTimeline(id);
			$(".page8 .t-shirt").hide().eq(resp.tshirt || 0).show();
			$(".page8 .label1 span").text(resp.no);
			$(".page8 .favor span").text(resp.favor);
			$(".page8 .favor").show();

			$(".page8 .info .no").text(resp.no);
			$(".page8 .info .author").text(resp.author);
			$(".page8 .info").show();

			var img = $(".page8 .work").get(0);
			img.onload = function() {
				$(".page .work").show();
			};
			img.src = resp.dataURL;
		});
	};

	p8.favor = function() {
		var id = getParam("id");
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
			$(".page8 .favor span").text(resp.favor);
			$(".page8 .msg").show();
			setTimeout(function() {
				$(".page8 .msg").hide();
			}, 2000);
		});
	};

	p8.start = function() {
		window.location = "/";
	};

	p8.close = function() {
		wechat.close();
	};

	return p8;
});