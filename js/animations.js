// Attach SVG.js to the existing inline SVG element
const draw = SVG('#spotifySVG')

// Select the Spotify logo path by its ID
const logo = draw.findOne('#Spotify')

// Measure the total length of the SVG path
// This value is crucial for stroke-dash animations
const length = logo.length()

// ---------- INITIAL STROKE SETUP ----------

// Remove any fill so the logo is drawn only as a line
logo
    .fill('none')

    // Configure the stroke (outline) appearance
    .stroke({
        color: '#00DA5A',   // Spotify green
        width: 0.6,         // Thin line for a clean draw effect
        linecap: 'round',   // Rounded line ends for smooth drawing
        linejoin: 'round',  // Smooth joins between path segments

        // dasharray defines the visible dash + hidden gap
        // Using the full path length makes one continuous dash
        dasharray: length,

        // dashoffset shifts the dash completely off the path
        // This makes the path fully invisible at the start
        dashoffset: length
    })

// ---------- ANIMATION LOOP FUNCTION ----------

function animateDrawUndraw() {

    // DRAW PHASE:
    // Animate dashoffset from `length` → `0`
    // This reveals the stroke progressively along the path
    logo
        .animate(3000, '<>')   // 3 seconds, smooth ease-in-out
        .stroke({ dashoffset: 0 })
        .after(() => {

            // UNDRAW PHASE:
            // Animate dashoffset from `0` → `-length`
            // This slides the stroke past the path, erasing it
            logo
                .animate(3000, '<>')  // 3 seconds undraw
                .stroke({ dashoffset: -length })

                // When undraw finishes, restart the cycle
                .after(animateDrawUndraw)
        })
}

// ---------- START THE ANIMATION ----------

// Kick off the first draw → undraw cycle
animateDrawUndraw()
