(function() {
    /* Canvas */

    var drawHistory = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var color = "red";

    canvas.width = Math.min(document.documentElement.clientWidth, window.innerWidth || 300);
    canvas.height = Math.min(document.documentElement.clientHeight, window.innerHeight || 300);

    ctx.strokeStyle = color;
    ctx.lineWidth = '2';
    ctx.lineCap = ctx.lineJoin = 'round';

    // /* Mouse and touch events */
    // document.getElementById('colorSwatch').addEventListener('click', function() {
    //   color = document.querySelector(':checked').getAttribute('data-color');
    // }, false);

    var isTouchSupported = 'ontouchstart' in window;
    var isPointerSupported = navigator.pointerEnabled;
    var isMSPointerSupported = navigator.msPointerEnabled;

    var downEvent = isTouchSupported ? 'touchstart' : (isPointerSupported ? 'pointerdown' : (isMSPointerSupported ? 'MSPointerDown' : 'mousedown'));
    var moveEvent = isTouchSupported ? 'touchmove' : (isPointerSupported ? 'pointermove' : (isMSPointerSupported ? 'MSPointerMove' : 'mousemove'));
    var upEvent = isTouchSupported ? 'touchend' : (isPointerSupported ? 'pointerup' : (isMSPointerSupported ? 'MSPointerUp' : 'mouseup'));

    canvas.addEventListener(downEvent, startDraw, false);
    canvas.addEventListener(moveEvent, draw, false);
    canvas.addEventListener(upEvent, endDraw, false);

    /* PubNub */

    var channel = 'draw';

    /* Draw on canvas */
    function drawOnCanvas(color, plots) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(plots[0].x, plots[0].y);

        for (var i = 1; i < plots.length; i++) {
            ctx.lineTo(plots[i].x, plots[i].y);
        }
        ctx.stroke();
    }

    function drawFromStream(message) {
        if (!message || message.plots.length < 1) return;
        drawOnCanvas(message.color, message.plots);
    }

    var isActive = false;
    var plots = [];
    var paths = [];

    function draw(e) {
        e.preventDefault(); // prevent continuous touch event process e.g. scrolling!
        if (!isActive) return;

        var x = isTouchSupported ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft);
        var y = isTouchSupported ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);
        plots.push({
            x: (x << 0),
            y: (y << 0)
        }); // round numbers for touch screens

        drawOnCanvas(color, plots);
    }

    function startDraw(e) {
        e.preventDefault();
        isActive = true;
    }

    function endDraw(e) {
        e.preventDefault();
        isActive = false;

        publish({
            color: color,
            plots: plots
        });

        paths.push(plots);
        plots = [];
    }

    window.getPaths = function() {
      return paths;
    };
})();