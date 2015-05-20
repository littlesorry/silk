requirejs.config({
    baseUrl: '/',
    waitSeconds: 60,
    paths: {
        'jquery': 'lib/jquery-1.11.1.min',
        'fullPage': 'lib/fullPage',
        'app': 'app/app',
        'd2': 'app/2d',
        'd3': 'app/3d'
    },
    shim: {
        'fullPage': {
            exports: 'FullPage'
        },
        'jquery': {
            exports: '$'
        }
    }
});

require(['jquery', 'fullPage', 'd2', 'd3'], function($, FullPage, d2, d3) {
    $(function() {
        console.log(window);
    });

    var runPage = new FullPage({
        id : 'pageContain',                            // id of contain
        slideTime : 500,                               // time of slide
        effect : {                                     // slide effect
                transform : {
                    translate : 'X',                   // 'X'|'Y'|'XY'|'none'
                    scale : [1, 1],                   // [scalefrom, scaleto]
                    rotate : [0, 0]                    // [rotatefrom, rotateto]
                },
                opacity : [0, 1]                       // [opacityfrom, opacityto]
            },                           
        mode : '',               // mode of fullpage
        easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
        , onSwipeStart : function(index, thisPage) {   // callback before pageChange
            // return 'stop';
        }
        , beforeChange : function(index, thisPage) {   // callback before pageChange
            // return 'stop';
        }
        , callback : function(index, thisPage) {       // callback when pageChange
            if ($(thisPage).hasClass('page5')) {
                // 2d canvas page
                if (window.d2 == null) {
                    window.d2 = initCanvas("canvas", {debug: true
                            , width: $("#canvas").width()
                            , height: $("#canvas").height()
                            , onDraw: function(plots) {
                            }});
                    window.undo = window.d2.undo;
                    window.clearCanvas = window.d2.clear;
                }
            }
        }
    });

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
});


