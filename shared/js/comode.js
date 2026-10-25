/**
 * comode — comode.js (Master Scripts Loader)
 * Inizializza i moduli condivisi:
 * - Tema Scuro / Chiaro persistente
 * - Motore Audio nativo Web Audio
 * - Sistema Gamification (XP, Livelli, Completamento e Toast)
 * - Auto-render KaTeX e interazioni UI
 */

(function() {
  function runInit() {
    if (window.ComodeTheme && window.ComodeTheme.bindButtons) {
      window.ComodeTheme.bindButtons();
    }
    if (window.ComodeGamification && window.ComodeGamification.initPageHooks) {
      window.ComodeGamification.initPageHooks();
    }
    if (window.ComodeComponents && window.ComodeComponents.initKaTeX) {
      window.ComodeComponents.initKaTeX();
      window.ComodeComponents.initTheoryAccordion();
    }
  }

  if (document.readyState !== 'loading') {
    runInit();
  } else {
    document.addEventListener('DOMContentLoaded', runInit);
  }
})();
