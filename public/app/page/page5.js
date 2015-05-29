define(['d2'], function(d2) {
        var p5 = {};

        p5.init = function() {
                p5.d2 = window.d2 = initCanvas("canvas", {
                		debug: true
                        , width: $("#canvas").width()
                        , height: $("#canvas").height()
                        });
                p5.undo = window.d2.undo;
                p5.clear = window.d2.clear;
        };

        p5.next = function() {
                if (p5.d2.getPaths().length === 0) {
                        alert("画点什么吧～");
                        return;
                }
                page(4);
        };

        return p5;
});