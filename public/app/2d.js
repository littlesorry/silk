function initCanvas(elem, props) {
    var drawHistory = false;
    var canvas = document.getElementById(elem);
    canvas.width = props.width;
    canvas.height = props.height;
    var ctx = canvas.getContext('2d');
    var color = props.strokeColor || "red";

    ctx.strokeStyle = color;
    ctx.lineWidth = props.strokeWidth || '2';
    ctx.lineCap = ctx.lineJoin = 'round';

    var isTouchSupported = 'ontouchstart' in window;
    var isPointerSupported = navigator.pointerEnabled;
    var isMSPointerSupported = navigator.msPointerEnabled;
    var debug = props.debug;

    var downEvent = isTouchSupported ? 'touchstart' : (isPointerSupported ? 'pointerdown' : (isMSPointerSupported ? 'MSPointerDown' : 'mousedown'));
    var moveEvent = isTouchSupported ? 'touchmove' : (isPointerSupported ? 'pointermove' : (isMSPointerSupported ? 'MSPointerMove' : 'mousemove'));
    var upEvent = isTouchSupported ? 'touchend' : (isPointerSupported ? 'pointerup' : (isMSPointerSupported ? 'MSPointerUp' : 'mouseup'));

    canvas.addEventListener(downEvent, startDraw, false);
    canvas.addEventListener(moveEvent, draw, false);
    canvas.addEventListener(upEvent, endDraw, false);

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
    var history = [];
    var paths = [];

    function draw(e) {
        e.preventDefault(); // prevent continuous touch event process e.g. scrolling!
        if (!isActive) return;

        var x = isTouchSupported ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft);
        var y = isTouchSupported ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);
            
        plots.push({
            x: (x << 0),
            y: (y << 0)
        }); 
        // round numbers for touch screens
        drawOnCanvas(color, plots);
    }

    function startDraw(e) {
        e.preventDefault();
        isActive = true;
        history.push(canvas.toDataURL());
    }

    function endDraw(e) {
        e.preventDefault();
        isActive = false;
        paths.push(plots);
        if (props.onDraw) props.onDraw.call(null, plots);
        plots = [];
    }

    function undo() {
        if (paths.length) {
            paths.pop();
            var restoreStatus = history.pop();
            var img = new Element('img', {'src':restoreStatus});
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);  
            }
        }
    }

    var getPaths = window.getPaths = function() {
      return paths;
    };

    return {
        draw: drawOnCanvas,
        undo: undo,
        canvas: canvas,
        getPaths: getPaths
    }
};