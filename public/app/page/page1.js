define(["jquery"], function($) {

	var p1 = {};

	var path = "";
	function calcPath(x, y) {
		$('.point').each(function() {
	      // check if is inside boundaries
	      if (!(
	          x <= $(this).offset().left || x >= $(this).offset().left + $(this).outerWidth() ||
	          y <= $(this).offset().top  || y >= $(this).offset().top + $(this).outerHeight()
	      )) {
	      	var current = $(this).data("path");
	      	var last = path.charAt(path.length - 1);
	      	if (current != last) {
	      		path += current;
	      	}
	      }
	    });
	}

	p1.init = function() {
		setTimeout(function() {
			$(".page1 .i2").addClass('bounce loop');
		}, 1000);

		$(".page1 .point").on("touchmove", function(e) {
			var touch = e.originalEvent.touches[0];
			calcPath(touch.clientX, touch.clientY);
		});

		$(".page1").on("touchend", function(e) {
			if (/^123/.test(path)) {
				$(".page1 .i2").removeClass('loop');
				$(".page1 .i1_old").addClass("fadeOut")
				$(".page1 .i1_new").show();

				setTimeout(function() {
					page(1);
				}, 3000);
			}
			path = "";
		});
	};


	return p1;
});