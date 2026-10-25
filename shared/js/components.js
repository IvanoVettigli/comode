/**
 * comode — components.js
 * Inizializzazione KaTeX, accordion teoria, toggle hint e componenti interattivi generici.
 */

class ComodeComponents {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initKaTeX();
      this.initTheoryAccordion();
    });
  }

  initKaTeX() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  initTheoryAccordion() {
    const toggleBtn = document.getElementById('toggleTheoryBtn');
    const content = document.getElementById('theoryContent');
    if (!toggleBtn || !content) return;

    let isVisible = true;
    toggleBtn.addEventListener('click', () => {
      isVisible = !isVisible;
      content.style.display = isVisible ? 'grid' : 'none';
      toggleBtn.innerHTML = isVisible
        ? '<span>Nascondi Teoria</span> ▴'
        : '<span>Mostra Teoria</span> ▾';
      if (window.ComodeAudio) window.ComodeAudio.playClick();
    });
  }
}

// Funzione globale comoda per i suggerimenti (usata nei pulsanti onclick)
window.toggleHint = function(hintId) {
  const el = document.getElementById(hintId);
  if (el) {
    const isShowing = el.classList.toggle('visible');
    if (isShowing && window.ComodeAudio) {
      window.ComodeAudio.playHint();
    } else if (window.ComodeAudio) {
      window.ComodeAudio.playClick();
    }
  }
};

window.ComodeComponents = new ComodeComponents();
