define(['page0', 'page1', 'page2'
	, 'page3', 'page4','page5'
	, 'page6', 'page7','page8'
	, 'page9'], function(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
	var page = {
		p0: p0,
		p1: p1,
		p2: p2,
		p3: p3,
		p4: p4,
		p5: p5,
		p6: p6,
		p7: p7,
		p8: p8,
		p9: p9
	};

	window.p0 = p0;
	window.p1 = p1;
	window.p2 = p2;
	window.p3 = p3;
	window.p4 = p4;
	window.p5 = p5;
	window.p6 = p6;
	window.p7 = p7;
	window.p8 = p8;
	window.p9 = p9;

	page.init = function() {
		typeof p0.init === 'function' && p0.init();
		typeof p1.init === 'function' && p1.init();
		typeof p2.init === 'function' && p2.init();
		typeof p3.init === 'function' && p3.init();
		typeof p4.init === 'function' && p4.init();
		typeof p5.init === 'function' && p5.init();
		typeof p6.init === 'function' && p6.init();
		typeof p7.init === 'function' && p7.init();
		typeof p8.init === 'function' && p8.init();
		typeof p9.init === 'function' && p9.init();
	};

	return page;
});