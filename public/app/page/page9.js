define(['jquery', 'jtap', 'nprogress'], function($, jtap, NP) {

	var p9 = {
		idx: 0
	};

	p9.init = function() {
		$("body").on("touchstart", ".dialog .btn", function() {
			if (!$(".dialog input").val()) {
				return;
			}

			$.get('/masterpiece/count?no=' + $(".dialog input").val())
			.done(function(resp) {
				if (resp.count && resp.count > 0) {
					window.location = "/?no=" + $(".dialog input").val() + "#6";
				} else {
					alert('作品号不存在！');
				}
			});
		});

		$(".page9 .list-container").scroll(function() {
			if ($(".list-container .list-item:last").offset().top < $(window).height()) {
				loadMore();
			}
		});
	};

	var loadingMore = false;
	function loadMore() {
		if (!loadingMore) {
			loadingMore = true;
			NP.start();
			var ajax = p9.idx === 0 ? $.get("/masterpiece/lastest?no=10&offset=" + offset) 
									: $.get("/masterpiece/favors?no=10&offset=" + offset);
			ajax
			.done(addList)
			.always(function() {
				NP.done();
				loadingMore = false;
			});
		}
	}

	var offset = 0;
	p9.tab = function(idx) {
		if (idx === p9.idx) {
			return;
		}

		offset = 0;
		if (idx === 0) {
			p9.idx = 0;
			$(".page9 .list").attr("src", "assets/p10/10-04_clip.png");
			$(".page9 .list-item").remove();
			p9.latest();
		} else {
			p9.idx = 1;
			$(".page9 .list").attr("src", "assets/p10/10-05_clip.png");
			$(".page9 .list-item").remove();
			p9.topFavor();
		}
	};

	p9.render = function() {
		p9.latest();
	};

	p9.search = function() {
		var html = "<input type='text' maxlength='5' placeholder='输入编号'>"
					+ "<div class='btn'>确定</div>";
		$('.dialog').html(html).show();
	};

	p9.start = function() {
		page(1);
	};

	function addList(resp) {
		for (var i = 0; i < resp.length; i++) {
			var masterpiece = resp[i];
			if (!masterpiece.dataURL || masterpiece.dataURL.length <　20) {
				continue;
			}

			var tshirt = (masterpiece.tshirt || 0) + 1;
			var html = '<div class="fixed bottom-in delay-0 list-item">'
						+ '<img class="fixed delay-1 bubble" src="assets/t-' 
						+ tshirt + '.png"><img class="fixed bubble delay-3 work">'
						+ '<div class="fixed bubble info">'
						+ 'No. <span class="no">' + masterpiece.no + '</span><br />'
						+ '<span class="author">' + masterpiece.author + '</span>'
						+ '</div>'
						+ '<div class="fixed bubble favor">'
						+ '<span class="focus delay-5">' + masterpiece.favor + '</span>赞'
						+ '</div>'
						+ '</div>';
			var div = $(html);
			div.data("id", masterpiece._id);
			div.find(".work").get(0).src = masterpiece.dataURL;
			$(".page9 .list-container .inner").append(div);

			div.tap(function() {
				var id = $(this).data("id");
				window.location = "/?id=" + id+ "#6";
			});
		}
		offset += resp.length;
	}

	p9.latest = function() {
		NP.start();
		$.get("/masterpiece/lastest?no=10")
		.done(addList)
		.always(function() {
			NP.done();
		});
	};

	p9.topFavor = function() {
		NP.start();
		$.get("/masterpiece/favors?no=10")
		.done(addList)
		.always(function() {
			NP.done();
		});
	};

	return p9;
});