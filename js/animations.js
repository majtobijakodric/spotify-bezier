/**
 * Spotify Animations Showcase - animations.js
 * Handles canvas animations and visual effects
 */

// ==========================================================================
// Canvas Background Effect
// ==========================================================================
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let lastDrawTime = 0;
    const drawInterval = 200; // Redraw every 200ms to keep CPU low

    // High DPI support
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        // Redraw after resize
        draw();
    }

    // Main draw function
    function draw() {
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw radial gradient (dark green tint centered around main content area)
        const centerX = width / 2;
        const centerY = height * 0.35; // Centered around hero section
        const radius = Math.max(width, height) * 0.6;

        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );

        gradient.addColorStop(0, 'rgba(30, 215, 96, 0.08)');
        gradient.addColorStop(0.3, 'rgba(30, 215, 96, 0.04)');
        gradient.addColorStop(0.6, 'rgba(25, 25, 25, 0.02)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add subtle noise texture
        drawNoise(ctx, width, height);
    }

    /**
     * Draws a subtle noise texture overlay
     */
    function drawNoise(ctx, width, height) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const noiseAmount = 8; // Very subtle noise

        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * noiseAmount;
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = 8;     // Alpha (very transparent)
        }

        ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Animation loop with throttling
     */
    function animate(timestamp) {
        if (timestamp - lastDrawTime >= drawInterval) {
            draw();
            lastDrawTime = timestamp;
        }
        animationId = requestAnimationFrame(animate);
    }

    // Initialize
    resizeCanvas();

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
    });

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Pause animation when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animate);
        }
    });
}

// ==========================================================================
// Canvas Spotify Logo (Example 3)
// ==========================================================================
function initCanvasAnimation() {
    const canvas = document.getElementById('spotify-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.miterLimit = 4;
    ctx.fillStyle = "#1ED760";

    // Translate to position the logo (original path uses 200,460 offset)
    ctx.translate(-200, -460);

    // Scale to fit the 400x400 canvas
    ctx.scale(4, 4);

    ctx.beginPath();
    ctx.moveTo(238.16, 481.36);
    ctx.bezierCurveTo(230.48, 476.8, 217.64, 476.32, 210.32, 478.6);
    ctx.bezierCurveTo(209.12, 478.96, 207.92, 478.24, 207.56, 477.16);
    ctx.bezierCurveTo(207.2, 475.96, 207.92, 474.76, 209, 474.4);
    ctx.bezierCurveTo(217.52, 471.88, 231.56, 472.36, 240.44, 477.64);
    ctx.bezierCurveTo(241.52, 478.24, 241.88, 479.68, 241.28, 480.76);
    ctx.bezierCurveTo(240.68, 481.6, 239.24, 481.96, 238.16, 481.36);

    ctx.moveTo(237.92, 488.08);
    ctx.bezierCurveTo(237.32, 488.92, 236.24, 489.28, 235.4, 488.68);
    ctx.bezierCurveTo(228.92, 484.72, 219.08, 483.52, 211.52, 485.92);
    ctx.bezierCurveTo(210.56, 486.16, 209.48, 485.68, 209.24, 484.72);
    ctx.bezierCurveTo(209, 483.76, 209.48, 482.68, 210.44, 482.44);
    ctx.bezierCurveTo(219.2, 479.8, 230, 481.12, 237.44, 485.68);
    ctx.bezierCurveTo(238.16, 486.04, 238.52, 487.24, 237.92, 488.08);

    ctx.moveTo(235.04, 494.68);
    ctx.bezierCurveTo(234.56, 495.4, 233.72, 495.64, 233, 495.16);
    ctx.bezierCurveTo(227.36, 491.68, 220.28, 490.96, 211.88, 492.88);
    ctx.bezierCurveTo(211.04, 493.12, 210.32, 492.52, 210.08, 491.8);
    ctx.bezierCurveTo(209.84, 490.96, 210.44, 490.24, 211.16, 490);
    ctx.bezierCurveTo(220.28, 487.96, 228.2, 488.8, 234.44, 492.64);
    ctx.bezierCurveTo(235.28, 493, 235.4, 493.96, 235.04, 494.68);

    ctx.moveTo(224, 460);
    ctx.bezierCurveTo(210.8, 460, 200, 470.8, 200, 484);
    ctx.bezierCurveTo(200, 497.2, 210.8, 508, 224, 508);
    ctx.bezierCurveTo(237.2, 508, 248, 497.2, 248, 484);
    ctx.bezierCurveTo(248, 470.8, 237.32, 460, 224, 460);

    ctx.fill("evenodd");
}

// ==========================================================================
// Shimmer Gradient Animation (Example 4)
// ==========================================================================
function initShimmerAnimation() {
    const gradient = document.getElementById('shimmer-gradient');
    if (!gradient) return;

    let offset = 0;
    let animationId;

    function animate() {
        offset = (offset + 0.5) % 100;

        // Update gradient position using x1/x2 for a sweep effect
        const x1 = -50 + offset;
        const x2 = 50 + offset;

        gradient.setAttribute('x1', `${x1}%`);
        gradient.setAttribute('x2', `${x2}%`);

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animate);
        }
    });
}

// ==========================================================================
// Initialize all animations on DOM ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initCanvasAnimation();
    initShimmerAnimation();
});
