/**
 * Spotify Animations Showcase - app.js
 * Handles UI interactions: tabs, accordion, and search
 */

// ==========================================================================
// DOM Ready Handler
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initCodeTabs();
});

// ==========================================================================
// Code Tabs Functionality
// ==========================================================================
function initCodeTabs() {
    const exampleRows = document.querySelectorAll('.example-row');

    exampleRows.forEach(row => {
        const tabs = row.querySelectorAll('.code-tab');
        const codeBlocks = row.querySelectorAll('.code-block');

        if (!tabs.length || !codeBlocks.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetLang = tab.dataset.tab;

                // Remove active class from all tabs and code blocks in this row
                tabs.forEach(t => t.classList.remove('code-tab--active'));
                codeBlocks.forEach(block => block.classList.remove('code-block--active'));

                // Add active class to clicked tab
                tab.classList.add('code-tab--active');

                // Find and show matching code block
                const targetBlock = row.querySelector(`.code-block[data-lang="${targetLang}"]`);
                if (targetBlock) {
                    targetBlock.classList.add('code-block--active');
                }
            });
        });
    });
}

// ==========================================================================
// Accordion Functionality (guarded for removed elements)
// ==========================================================================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    if (!accordionHeaders.length) return;

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const controlsId = header.getAttribute('aria-controls');
            if (!controlsId) return;

            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = document.getElementById(controlsId);

            if (!content) return;

            // Toggle current accordion
            if (isExpanded) {
                closeAccordion(header, content);
            } else {
                openAccordion(header, content);
            }
        });

        // Keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
}

/**
 * Opens an accordion panel with animation
 */
function openAccordion(header, content) {
    if (!header || !content) return;
    header.setAttribute('aria-expanded', 'true');
    content.hidden = false;

    // Force a reflow to enable animation
    content.offsetHeight;

    // Set max-height for animation
    content.style.maxHeight = content.scrollHeight + 'px';
}

/**
 * Closes an accordion panel with animation
 */
function closeAccordion(header, content) {
    if (!header || !content) return;
    header.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0';

    // Wait for animation to complete before hiding
    content.addEventListener('transitionend', function handler() {
        content.hidden = true;
        content.removeEventListener('transitionend', handler);
    });
}

// ==========================================================================
// Search Input Enhancement (guarded for removed elements)
// ==========================================================================
const searchInput = document.getElementById('search-input');
if (searchInput) {
    // Add search functionality placeholder
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // In a real app, this would trigger a search
                console.log('Searching for:', query);
            }
        }
    });
}
