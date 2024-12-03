const themeToggle = document.getElementById('themeToggle');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            themeToggle.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            themeToggle.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Initial theme setup
    if (savedTheme === 'light') {
        setTheme('light');
    } else if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        // If no saved preference, use system preference
        setTheme(systemPrefersDark.matches ? 'dark' : 'light');
    }
    
    // Toggle theme when clicked
    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = !document.documentElement.classList.contains('light-mode');
        setTheme(isCurrentlyDark ? 'light' : 'dark');
    });
    
    // Listen for system theme changes
    systemPrefersDark.addListener((e) => {
        setTheme(e.matches ? 'dark' : 'light');
    });