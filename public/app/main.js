requirejs.config({
    baseUrl: '/',
    waitSeconds: 60,
    paths: {
        'jquery': 'lib/jquery-1.11.1.min',
        'fullPage': 'lib/fullPage',
        'three': 'lib/three',
        'project': 'lib/three-project',
        'renderer': 'lib/three-renderer',
        'camera': 'lib/three-camera',
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

require(['jquery', 'fullPage', 'd2', 'd3'], function($, FullPage, d2, d3) {
    $(function() {
        if (window.location.hash) {
            $(".page").removeClass("current");
            $("." + window.location.hash.replace("#", "")).addClass("current");
        }

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
                window.location.hash = $(thisPage).attr("class").match(/page\d+/);
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
                } else if ($(thisPage).hasClass('page6')) {
                    if (!window.d3Ready) {
                        window.d3Ready = true;
                        d3.init("d3-canvas", {
                            container: "#d3-container"
                            , width: 320
                            , height: 300
                            , d2Width: window.d2.canvas.getAttribute("width")
                            , d2Height: window.d2.canvas.getAttribute("height")});
                    }
                    d3.clear();
                    for (var i = window.d2.getPaths().length - 1; i >= 0; i--) {
                        d3.addMeshes(window.d2.getPaths()[i]);
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

});


