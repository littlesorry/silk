requirejs.config({
    baseUrl: '/',
    waitSeconds: 60,
    paths: {
        'jquery': '//libs.baidu.com/jquery/1.11.1/jquery.min',
        'fullPage': 'lib/fullPage',
        'three': 'lib/three',
        'project': 'lib/three-project',
        'renderer': 'lib/three-renderer',
        'camera': 'lib/three-camera',
        'app': 'app/app',
        'd2': 'app/2d',
        'd3': 'app/3d',
        'wx': '//res.wx.qq.com/open/js/jweixin-1.0.0',
        'wechat': 'app/wechat',
        'page': 'app/page',
        'page0': 'app/page/page0',
        'page1': 'app/page/page1',
        'page2': 'app/page/page2',
        'page3': 'app/page/page3',
        'page4': 'app/page/page4',
        'page5': 'app/page/page5',
        'page6': 'app/page/page6',
        'page7': 'app/page/page7',
        'page8': 'app/page/page8',
        'page9': 'app/page/page9'
    },
    shim: {
        'fullPage': {
            exports: 'FullPage'
        },
        'jquery': {
            exports: '$'
        },
        'wx': {
            exports: 'wx'
        },
        'three': {
            exports: 'THREE'
        },
        'project': {
            deps: ['three']
        },
        'renderer': {
            deps: ['three']
        },
        'camera': {
            deps: ['three']
        },
        'd3': {
            deps: ['three', 'project', 'renderer', 'camera'],
            exports: 'd3'
        }
    }
});

require(['jquery', 'fullPage', 'd2', 'd3', 'page', 'wechat'], function($, FullPage, d2, d3, pages, wechat) {
    $(function() {
        var preOntouch = document.ontouchstart;
        document.ontouchstart = function(e){ 
            e.preventDefault(); 
        };

        pages.init();
        wechat.init();
        wechat.shareTimeline();

        var runPage = new FullPage({
            id : 'pageContain',                            // id of contain
            slideTime : 200,                               // time of slide
            effect : {                                     // slide effect
                transform : {
                    translate : 'none',                   // 'X'|'Y'|'XY'|'none'
                    scale : [1, 1],                   // [scalefrom, scaleto]
                    rotate : [0, 0]                    // [rotatefrom, rotateto]
                },
                opacity : [0, 1]                       // [opacityfrom, opacityto]
            },                           
            mode : '',               // mode of fullpage
            easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
            , onSwipeStart : function(index, thisPage) {   // callback before pageChange
            }
            , beforeChange : function(index, thisPage) {   // callback before pageChange

            }
            , callback : function(index, thisPage) {       // callback when pageChange
                window.location.hash = $(thisPage).data("idx");
                if (!$(thisPage).hasClass('page1')) {
                    document.ontouchstart = preOntouch;
                } 

                if ($(thisPage).hasClass('page5')) {
                } else if ($(thisPage).hasClass('page6')) {
                    p6.render();
                } else if ($(thisPage).hasClass('page7')) {
                    p7.render();
                } else if ($(thisPage).hasClass('page8')) {
                    p8.render();
                } else if ($(thisPage).hasClass('page9')) {
                    p9.render();
                }       
            }
        });

        window.runPage = runPage;

        function next() {
            runPage.next();
        }

        function prev() {
            runPage.prev();
        }

        function page(idx) {
            runPage.go(idx || 0);
        }

        function goInstruction() {
            window.location.href = "/instruction.html";
        }

        window.next = next;
        window.prev = prev;
        window.page = page;
        window.goInstruction = goInstruction;

        if (window.location.hash) {
            runPage.go(window.location.hash.replace("#", ""));
        }

        $("body").on("change", "input", function() {
            if ($(this).val()) {
                $(this).addClass("changed");
            } else {
                $(this).removeClass("changed");
            }
        })
    });

});


