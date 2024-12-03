(function () {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            themeToggle?.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            themeToggle?.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Apply the saved theme or system preference on load
    if (savedTheme === 'light') {
        setTheme('light');
    } else if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme(systemPrefersDark.matches ? 'dark' : 'light');
    }

    // Add event listener to the toggle button if it exists
    themeToggle?.addEventListener('click', () => {
        const isCurrentlyDark = !document.documentElement.classList.contains('light-mode');
        setTheme(isCurrentlyDark ? 'light' : 'dark');
    });

    // Listen for system theme changes
    systemPrefersDark.addEventListener('change', (e) => {
        setTheme(e.matches ? 'dark' : 'light');
    });
})();



    // Add this to your script.js file
document.addEventListener('DOMContentLoaded', () => {
    const changelogLink = document.querySelector('.left-header a[href="changelog.html"]');
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('changelog-preview');
    document.body.appendChild(previewContainer);

    // Fetch changelog content
    async function fetchChangelogPreview() {
        try {
            const response = await fetch('changelog.html');
            const text = await response.text();
            
            // Create a temporary div to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            
            // Extract the first few changelog entries
            const previewContent = tempDiv.querySelector('main') || tempDiv.querySelector('body');
            return previewContent ? previewContent.innerHTML : 'My work timeline ✨';
        } catch (error) {
            return 'Unable to load changelog preview';
        }
    }

    // Show preview on hover
    changelogLink.addEventListener('mouseenter', async (e) => {
        previewContainer.innerHTML = 'Loading...';
        
        const previewContent = await fetchChangelogPreview();
        
        previewContainer.innerHTML = previewContent;
        
        // Position the preview near the link
        const linkRect = changelogLink.getBoundingClientRect();
        previewContainer.style.top = `${linkRect.bottom + window.scrollY + 10}px`;
        previewContainer.style.left = `${linkRect.left + window.scrollX}px`;
        
        previewContainer.classList.add('visible');
    });

    // Hide preview when mouse leaves
    changelogLink.addEventListener('mouseleave', () => {
        previewContainer.classList.remove('visible');
    });

    // Prevent preview from disappearing when hovering over it
    previewContainer.addEventListener('mouseenter', () => {
        previewContainer.classList.add('visible');
    });

    previewContainer.addEventListener('mouseleave', () => {
        previewContainer.classList.remove('visible');
    });
});