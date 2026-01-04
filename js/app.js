/**
 * Spotify Animations Showcase - app.js
 * Handles UI interactions: tabs, accordion, and search
 */

// ==========================================================================
// DOM Ready Handler
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Highlight all code blocks on initial load
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(document);
    }
    initCodeTabs();
    initComparisonDownloads();
});

// ==========================================================================
// Clipboard Copy Utility
// ==========================================================================
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            if (success) {
                resolve();
            } else {
                reject(new Error('execCommand copy failed'));
            }
        } catch (err) {
            document.body.removeChild(textarea);
            reject(err);
        }
    });
}

// ==========================================================================
// Comparison Card Downloads
// ==========================================================================
function initComparisonDownloads() {
    const downloadableBoxes = document.querySelectorAll('.comparison-box[data-download]');

    downloadableBoxes.forEach(box => {
        const triggerDownload = () => {
            // Ignore if user is selecting text
            if (window.getSelection().toString().trim()) return;

            const url = box.dataset.download;
            const filename = box.dataset.filename || '';

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        };

        // Click handler
        box.addEventListener('click', triggerDownload);

        // Keyboard handler (Enter/Space)
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerDownload();
            }
        });
    });
}

// ==========================================================================
// Code Tabs Functionality
// ==========================================================================
// Store timeout IDs per row to prevent overlapping status messages
const copyStatusTimeouts = new WeakMap();

function initCodeTabs() {
    const exampleRows = document.querySelectorAll('.example-row');

    exampleRows.forEach(row => {
        const codeTabs = row.querySelector('.code-tabs');
        const tabs = row.querySelectorAll('.code-tab');
        const codeBlocks = row.querySelectorAll('.code-block');

        if (!tabs.length || !codeBlocks.length || !codeTabs) return;

        // Ensure status span exists in each .code-tabs
        let statusEl = codeTabs.querySelector('.code-copy-status');
        if (!statusEl) {
            statusEl = document.createElement('span');
            statusEl.className = 'code-copy-status';
            statusEl.setAttribute('aria-live', 'polite');
            codeTabs.appendChild(statusEl);
        }

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

                    // Get the code element inside the block
                    const codeEl = targetBlock.querySelector('code');
                    if (codeEl) {
                        // Trigger syntax highlighting for this code element
                        if (typeof Prism !== 'undefined') {
                            Prism.highlightElement(codeEl);
                        }

                        // Copy the code text to clipboard
                        const codeText = (codeEl.textContent || codeEl.innerText).trim();
                        copyToClipboard(codeText).then(() => {
                            // Show "Copied!" status
                            showCopyStatus(row, statusEl);
                        }).catch(() => {
                            // Silently fail, or could show error message
                        });
                    }
                }
            });
        });
    });
}

function showCopyStatus(row, statusEl) {
    // Clear any existing timeout for this row
    const existingTimeout = copyStatusTimeouts.get(row);
    if (existingTimeout) {
        clearTimeout(existingTimeout);
    }

    // Show the status
    statusEl.textContent = 'Copied!';
    statusEl.classList.add('is-visible');

    // Hide after 800ms
    const timeoutId = setTimeout(() => {
        statusEl.classList.remove('is-visible');
    }, 800);

    copyStatusTimeouts.set(row, timeoutId);
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

function openAccordion(header, content) {
    if (!header || !content) return;
    header.setAttribute('aria-expanded', 'true');
    content.hidden = false;

    content.offsetHeight;

    content.style.maxHeight = content.scrollHeight + 'px';
}

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

const searchInput = document.getElementById('search-input');
if (searchInput) {
    // Add search functionality placeholder
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
            }
        }
    });
}
