define(['jquery'], function($) {

	var p9 = {
		idx: 0
	};
	p9.tab = function(idx) {
		if (idx === p9.idx) {
			return;
		}

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

	p9.latest = function() {
		$.get("/masterpiece/lastest?no=10")
		.done(function(resp) {
			for (var i = resp.length - 1; i >=0; i--) {
				var masterpiece = resp[i];
				if (masterpiece.dataURL.length <　20) {
					continue;
				}
				var tshirt = (masterpiece.tshirt || 0) + 1;
				var html = '<div class="fixed bottom-in delay-0 list-item"><img class="fixed delay-1 bubble" src="assets/t-' 
							+ tshirt + '.png"><img class="fixed bubble delay-3 work"></div>';
				var div = $(html);
				div.find(".work").get(0).src = masterpiece.dataURL;

				$(".page9 .list-container").prepend(div);
			}
		});
	};

	p9.topFavor = function() {
		$.get("/masterpiece/favors?no=10")
		.done(function(resp) {
			resp.forEach(function(masterpiece) {
				if (masterpiece.dataURL.length <　20) {
					return;
				}
				var tshirt = (masterpiece.tshirt || 0) + 1;
				var html = '<div class="fixed bottom-in delay-0 list-item"><img class="fixed delay-1 bubble" src="assets/t-' 
							+ tshirt + '.png"><img class="fixed bubble delay-3 work"></div>';
				var div = $(html);
				div.find(".work").get(0).src = masterpiece.dataURL;

				$(".page9 .list-container").prepend(div);
			});
		});
	};

	return p9;
});