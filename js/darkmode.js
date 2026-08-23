(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;  // localStorage blocked (private browsing on some browsers)
    }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function getCurrentTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function updateToggleLabel(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    button.setAttribute(
      'aria-label',
      theme === DARK ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  // Apply theme IMMEDIATELY — before the rest of the page renders
  applyTheme(getCurrentTheme());

  // Wire up the toggle after the DOM loads
  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    updateToggleLabel(getCurrentTheme());

    button.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === DARK ? LIGHT : DARK;

      applyTheme(next);
      updateToggleLabel(next);

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        // localStorage unavailable — theme still switches for this session
      }
    });

    // Update icon when OS theme changes (user changes system preference while tab is open)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        const theme = e.matches ? DARK : LIGHT;
        applyTheme(theme);
        updateToggleLabel(theme);
      }
    });
  });
})();