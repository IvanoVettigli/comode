/**
 * comode — theme.js
 * Gestione tema chiaro/scuro con persistenza in localStorage.
 */

class ComodeTheme {
  constructor() {
    this.storageKey = 'comode-theme';
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.storageKey) || 'dark';
    this.applyTheme(savedTheme, false);

    document.addEventListener('DOMContentLoaded', () => {
      this.bindButtons();
    });
  }

  applyTheme(theme, animate = true) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    this.updateIcons(theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    if (window.ComodeAudio) window.ComodeAudio.playClick();
  }

  updateIcons(theme) {
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'light' ? 'Scuro' : 'Chiaro';
    }
  }

  bindButtons() {
    const btn = document.getElementById('themeToggleBtn');
    if (btn && !btn._comodeBound) {
      btn._comodeBound = true;
      btn.addEventListener('click', () => this.toggleTheme());
    }
  }
}

window.ComodeTheme = new ComodeTheme();
