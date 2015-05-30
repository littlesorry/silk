define(['jquery'], function($) {

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
			alert("无效的作品号！");
			return;
		}

		$.getJSON("/masterpiece/" + id)
		.done(function(resp) {
			$(".page8 .t-shirt").hide().eq(resp.tshirt || 0).show();
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
			alert("无效的作品号！");
			return;
		}

		if (hasFavored(id)) {
			alert("请勿重复点赞！");
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

	return p8;
});