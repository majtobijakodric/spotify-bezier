function drawLogo(canvas, cx, cy, r) {
    var ctx = canvas.getContext("2d");

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

    ctx.bezierCurveTo(cx + r, cy - oy, cx + ox, cy - r, cx, cy - r);// Top-right quadrant
    ctx.bezierCurveTo(cx - ox, cy - r, cx - r, cy - oy, cx - r, cy);// Top-left quadrant
    ctx.bezierCurveTo(cx - r, cy + oy, cx - ox, cy + r, cx, cy + r);// Bottom-left quadrant
    ctx.bezierCurveTo(cx + ox, cy + r, cx + r, cy + oy, cx + r, cy);// Bottom-right quadrant

    ctx.closePath();
    ctx.fillStyle = "#1ED760";
    ctx.fill();


    // za notranji del uporabi ctx.clip
}

var canvas = document.getElementById("spotify-canvas");
var x = canvas.height / 2;
drawLogo(canvas, x, x, x);

