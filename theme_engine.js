const ThemeEngine = {
    init() {
        const saved = localStorage.getItem('glitch_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        this.updateUI(saved);
    },
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('glitch_theme', next);
        this.updateUI(next);
        if(window.DataManager) DataManager.pushEvent('UX', 'Theme_Toggle', next);
    },
    updateUI(theme) {
        const btn = document.getElementById('themeBtn');
        if(btn) btn.innerText = theme === 'dark' ? '🌙' : '☀️';
    }
};
ThemeEngine.init();
