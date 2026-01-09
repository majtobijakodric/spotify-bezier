
var canvas = document.getElementById("spotify-canvas");
var example1 = document.getElementById("example-panel-1");
var example2 = document.getElementById("example-panel-2");

var colorPicker = document.getElementById("color-picker");

var spotifyGreen = "#1ED760";
var spotifyGray = "#191414";

// color picker
Coloris({
    el: '#color-picker',
    parent: '#color-picker-container',
    theme: 'large',
    themeMode: 'dark',
    inline: true,
    defaultColor: '#1ED760',
    formatToggle: true,
    alpha: false,
    closeButton: false,
    clearButton: false,
    onChange: (color, inputEL) => {
        drawSpotifyLogo(example2, color);
    }
});

if (canvas) {
    resizeAndDraw(canvas);
    window.addEventListener("resize", function () {
        resizeAndDraw(canvas);
    });
}



drawSpotifyLogo(example1, spotifyGreen); // primer 1
drawSpotifyLogo(example2, spotifyGreen); // primer 2


colorPicker.addEventListener("input", (event) => {
    const color = event.target.value;
    drawSpotifyLogo(example2, color);
})

function resizeAndDraw(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawSpotifyLogo(canvas, spotifyGreen);
}


function drawSpotifyLogo(canvas, color) {
    var ctx = canvas.getContext("2d");



    // Design space is 400x400; compute scale + offset to center the logo
    var designSize = 400;
    var scale = Math.min(canvas.width, canvas.height) / designSize;
    var offsetX = (canvas.width - designSize * scale) / 2;
    var offsetY = (canvas.height - designSize * scale) / 2;


    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Clip to the green circle in design coordinates
    ctx.beginPath();
    
    var cx = designSize / 2;
    var cy = designSize / 2;
    var r = designSize / 2;
    // Magic constant for circle approximation
    const k = 0.5522847498307936; // ≈ 4*(√2-1)/3

    const ox = r * k; // control point offset horizontal
    const oy = r * k; // control point offset vertical

    const x0 = cx - r;
    const x1 = cx - r;
    const x2 = cx - ox;
    const x3 = cx;
    const x4 = cx + ox;
    const x5 = cx + r;

    const y0 = cy - r;
    const y1 = cy - oy;
    const y2 = cy;
    const y3 = cy + oy;
    const y4 = cy + r;

    ctx.beginPath();

    // Start at the rightmost point of the circle
    ctx.moveTo(cx + r, cy);

    // Top-right quadrant
    ctx.bezierCurveTo(cx + r, cy - oy, cx + ox, cy - r, cx, cy - r);

    // Top-left quadrant
    ctx.bezierCurveTo(cx - ox, cy - r, cx - r, cy - oy, cx - r, cy);

    // Bottom-left quadrant
    ctx.bezierCurveTo(cx - r, cy + oy, cx - ox, cy + r, cx, cy + r);

    // Bottom-right quadrant
    ctx.bezierCurveTo(cx + ox, cy + r, cx + r, cy + oy, cx + r, cy);

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.clip();

    // top curve
    ctx.beginPath();
    ctx.moveTo(318, 178);
    ctx.bezierCurveTo(254, 140, 147, 136, 86, 155);
    ctx.bezierCurveTo(76, 158, 66, 152, 63, 143);
    ctx.bezierCurveTo(60, 133, 66, 123, 75, 120);
    ctx.bezierCurveTo(146, 99, 263, 103, 337, 147);
    ctx.bezierCurveTo(346, 152, 349, 164, 344, 173);
    ctx.bezierCurveTo(339, 180, 327, 183, 318, 178);
    ctx.closePath();
    ctx.fillStyle = spotifyGray;
    ctx.fill();

    // mid curve
    ctx.beginPath();
    ctx.moveTo(316, 234);
    ctx.bezierCurveTo(311, 241, 302, 244, 295, 239);
    ctx.bezierCurveTo(241, 206, 159, 196, 96, 216);
    ctx.bezierCurveTo(88, 218, 79, 214, 77, 206);
    ctx.bezierCurveTo(75, 198, 79, 189, 87, 187);
    ctx.bezierCurveTo(160, 165, 250, 176, 312, 214);
    ctx.bezierCurveTo(318, 217, 321, 227, 316, 234);
    ctx.closePath();
    ctx.fillStyle = spotifyGray;
    ctx.fill();

    // bottom curve
    ctx.beginPath();
    ctx.moveTo(292, 289);
    ctx.bezierCurveTo(288, 295, 281, 297, 274, 293);
    ctx.bezierCurveTo(228, 264, 169, 258, 99, 274);
    ctx.bezierCurveTo(92, 276, 86, 271, 84, 265);
    ctx.bezierCurveTo(82, 258, 87, 252, 93, 250);
    ctx.bezierCurveTo(169, 233, 235, 240, 287, 272);
    ctx.bezierCurveTo(294, 275, 295, 283, 292, 289);
    ctx.closePath();
    ctx.fillStyle = spotifyGray;
    ctx.fill();

    ctx.restore(); // restore pre-clip
    ctx.restore(); // restore scale/translate
}


