define(['jquery', 'wx'], function($, wx) {

	var wechat = {};

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
		wx.onMenuShareTimeline({
		    title: '雅诗兰黛', // 分享标题
		    link: 'http:///?id=' + id + '#6', // 分享链接
		    imgUrl: '', // 分享图标
		    success: function () {
		    	shareOK();
		    },
		    cancel: function () {
		    	 
		    }
		});
	};

	wechat.shareFriend = function() {
		wx.onMenuShareAppMessage({
		    title: '雅诗兰黛', // 分享标题
		    desc: '雅诗兰黛关爱乳腺健康', // 分享描述
		    link: '', // 分享链接
		    imgUrl: '', // 分享图标
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