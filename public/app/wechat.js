define(['jquery', 'wx'], function($, wx) {

	var wechat = {};

	var host = 'http://elgame.gofaner.com/';
	var img = 'http://elgame.gofaner.com/assets/icon.jpg';

	wechat.init = function() {
        wx.showOptionMenu();
	};

	function shareOK() {
		$(".dialog").html("分享成功！").show();
		setTimeout(function() {
			$(".dialog").hide();
		}, 2000);
	}

	wechat.shareTimeline = function(id) {
		var link = id ? host + id + '#6' : host;
		wx.onMenuShareTimeline({
		    title: '雅诗兰黛',
		    desc: '雅诗兰黛关爱乳腺健康',
		    link: link,
		    imgUrl: img,
		    success: function () {
		    	shareOK();
		    },
		    cancel: function () {
		    }
		});
	};

	wechat.shareFriend = function() {
		var link = id ? host + id + '#6' : host;
		wx.onMenuShareAppMessage({
		    title: '雅诗兰黛',
		    desc: '雅诗兰黛关爱乳腺健康',
		    link: link,
		    imgUrl: img,
		    success: function () { 
		    	shareOK();
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	}

	wechat.close = function() {
		wx.closeWindow();
	};

	return wechat;
});