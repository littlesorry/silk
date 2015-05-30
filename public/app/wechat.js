define(['wx'], function(wx) {

	var wechat = {};

	wechat.shareTimeline = function(id) {
		wx.onMenuShareTimeline({
		    title: '雅诗兰黛', // 分享标题
		    link: 'http:///?id=' + id + '#6', // 分享链接
		    imgUrl: '', // 分享图标
		    success: function () {
				$(".dialog").html("分享成功！").show();
				setTimeout(function() {
					$(".dialog").hide();
				}, 2000);

		    },
		    cancel: function () {
		    	 
		    }
		});
	};

	wechat.close = function() {
		wx.closeWindow();
	};

	return wechat;
});