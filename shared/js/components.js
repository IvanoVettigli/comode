/**
 * comode — components.js
 * Inizializzazione KaTeX centralizzata, navigazione Teoria <-> Pratica,
 * accordion teoria, toggle hint e componenti interattivi generici.
 */

class ComodeComponents {
  constructor() {
    this._isTheoryVisible = true;
  }

  /**
   * Renderizza le formule KaTeX all'interno di un elemento DOM specifico.
   * Gestisce in sicurezza il caricamento defer degli script CDN.
   * @param {HTMLElement} [target=document.body]
   */
  renderMath(target = document.body) {
    if (!target) return;

    const executeRender = () => {
      if (typeof window.renderMathInElement !== 'function') return false;
      try {
        window.renderMathInElement(target, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
        return true;
      } catch (err) {
        console.warn('ComodeComponents: errore rendering KaTeX', err);
        return false;
      }
    };

    if (!executeRender()) {
      window.addEventListener('load', () => executeRender(), { once: true });
    }
  }

  /**
   * Inizializza KaTeX sull'intera pagina una sola volta al bootstrap.
   */
  initKaTeX() {
    if (document.body && !document.body._comodeKatexInitialized) {
      document.body._comodeKatexInitialized = true;
      this.renderMath(document.body);
    }
  }

  /**
   * Inizializza l'accordion della Scheda Teoria Flash con guardia anti-doppio binding.
   */
  initTheoryAccordion() {
    const toggleBtn = document.getElementById('toggleTheoryBtn');
    const content = document.getElementById('theoryContent');
    if (!toggleBtn || !content || toggleBtn._comodeBound) return;

    toggleBtn._comodeBound = true;
    this._isTheoryVisible = content.style.display !== 'none';

    toggleBtn.addEventListener('click', () => {
      this.setTheoryVisible(!this._isTheoryVisible, true);
    });
  }

  /**
   * Imposta esplicitamente la visibilità della Scheda Teoria Flash.
   * @param {boolean} visible
   * @param {boolean} [playSound=false]
   */
  setTheoryVisible(visible, playSound = false) {
    const toggleBtn = document.getElementById('toggleTheoryBtn');
    const content = document.getElementById('theoryContent');
    if (!content) return;

    this._isTheoryVisible = visible;
    content.style.display = visible ? 'grid' : 'none';

    if (toggleBtn) {
      toggleBtn.innerHTML = visible
        ? '<span>Nascondi Teoria</span> ▴'
        : '<span>Mostra Teoria</span> ▾';
    }
    if (playSound && window.ComodeAudio) {
      window.ComodeAudio.playClick();
    }
  }

  /**
   * Scorre fino a una specifica pillola teorica (es. 'teoria-2'),
   * riaprendo automaticamente l'accordion della teoria se era chiuso
   * ed evidenziando temporaneamente la card di destinazione.
   * @param {string} theoryId
   */
  scrollToTheory(theoryId) {
    if (!theoryId) return;
    if (!this._isTheoryVisible) {
      this.setTheoryVisible(true, false);
    }

    const target = document.getElementById(theoryId);
    if (!target) return;

    if (window.ComodeAudio) window.ComodeAudio.playHint();
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('theory-highlight');

    if (target._highlightTimer) clearTimeout(target._highlightTimer);
    target._highlightTimer = setTimeout(() => {
      target.classList.remove('theory-highlight');
    }, 2200);
  }
}

// Helper globale per i suggerimenti (usata nei pulsanti onclick="toggleHint('...')")
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

// Helper globale per i link di collegamento Teoria <-> Pratica
window.scrollToTheory = function(theoryId) {
  if (window.ComodeComponents) {
    window.ComodeComponents.scrollToTheory(theoryId);
  }
};

window.ComodeComponents = new ComodeComponents();
