/**
 * comode — flashcards.js
 * Motore per Flashcard interattive con test ripetibili all'infinito e gamification (XP).
 * Rispetta il principio dell'apprendimento per padronanza (Mastery Learning),
 * rimescola automaticamente l'ordine delle opzioni A/B/C/D ad ogni tentativo
 * ed evidenzia il collegamento esplicito con la teoria.
 */

class ComodeFlashcardDeck {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.rawCards = Array.isArray(options.cards) ? options.cards : [];
    this.shuffleOptions = options.shuffleOptions !== false;
    this.cards = [];
    this.deckId = options.deckId || containerId;
    this.xpPerCard = options.xpPerCard || 10;
    this.completionXP = options.completionXP || 20;
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.hasEarnedXPThisRun = false;

    this.prepareCards();
    this.render();
  }

  /**
   * Clona le carte e, se abilitato, mescola le opzioni con algoritmo Fisher-Yates
   * aggiornando l'indice della risposta corretta ed evitando sequenze costanti.
   */
  prepareCards() {
    this.cards = this.rawCards.map(raw => {
      const clonedOptions = Array.isArray(raw.options) ? [...raw.options] : [];
      let correctIdx = typeof raw.correct === 'number' ? raw.correct : 0;

      if (this.shuffleOptions && raw.shuffleOptions !== false && clonedOptions.length > 1) {
        const indexed = clonedOptions.map((text, idx) => ({
          text,
          isCorrect: idx === correctIdx
        }));

        for (let i = indexed.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = indexed[i];
          indexed[i] = indexed[j];
          indexed[j] = tmp;
        }

        return {
          ...raw,
          options: indexed.map(item => item.text),
          correct: indexed.findIndex(item => item.isCorrect)
        };
      }

      return {
        ...raw,
        options: clonedOptions,
        correct: correctIdx
      };
    });

    // Garantisce che in mazzi con >= 3 carte la lettera corretta non sia mai identica per tutte le carte
    if (this.shuffleOptions && this.cards.length >= 3) {
      const firstCorrect = this.cards[0].correct;
      const allSame = this.cards.every(c => c.correct === firstCorrect && c.options.length > 1);
      if (allSame) {
        const lastCard = this.cards[this.cards.length - 1];
        const swapWith = (lastCard.correct + 1) % lastCard.options.length;
        const tmp = lastCard.options[lastCard.correct];
        lastCard.options[lastCard.correct] = lastCard.options[swapWith];
        lastCard.options[swapWith] = tmp;
        lastCard.correct = swapWith;
      }
    }
  }

  render() {
    if (!this.cards || this.cards.length === 0) {
      this.container.innerHTML = '<p>Nessuna flashcard configurata per questo modulo.</p>';
      return;
    }

    if (this.currentIndex >= this.cards.length) {
      this.renderSummary();
      return;
    }

    const card = this.cards[this.currentIndex];
    const total = this.cards.length;
    const currentNum = this.currentIndex + 1;
    const progressPct = ((currentNum - 1) / total) * 100;

    let theoryBadgeHtml = '';
    if (card.theoryRef) {
      if (card.theoryTargetId) {
        theoryBadgeHtml = `
          <div>
            <button type="button" class="theory-ref-pill" onclick="scrollToTheory('${card.theoryTargetId}')">
              🔗 ${card.theoryRef}
            </button>
          </div>
        `;
      } else {
        theoryBadgeHtml = `
          <div>
            <span class="theory-ref-pill" style="cursor: default;">
              🔗 ${card.theoryRef}
            </span>
          </div>
        `;
      }
    }

    this.container.innerHTML = `
      <div class="flashcard-box">
        <div class="flashcard-topbar">
          <div class="flashcard-step-badge">
            <span class="icon">🃏</span> Flashcard ${currentNum} di ${total}
          </div>
          <div class="flashcard-reward-pill">+${this.xpPerCard} XP</div>
        </div>

        <div class="flashcard-track">
          <div class="flashcard-track-fill" style="width: ${progressPct}%"></div>
        </div>

        <div class="flashcard-body">
          ${theoryBadgeHtml}
          <div class="flashcard-category">${card.category || 'Mettiti alla prova'}</div>
          <h3 class="flashcard-question">${card.question}</h3>
          ${card.context ? `<p class="flashcard-context">${card.context}</p>` : ''}

          <div class="flashcard-options">
            ${card.options.map((opt, idx) => `
              <button class="flashcard-opt-btn" onclick="ComodeFlashcards.handleAnswer('${this.container.id}', ${idx})">
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="flashcard-feedback" id="${this.container.id}_fb" style="display: none;"></div>
        </div>
      </div>
    `;

    this.renderMath(this.container);
    this.answered = false;
  }

  renderMath(element) {
    const target = element || this.container;
    if (!target) return;

    if (window.ComodeComponents && typeof window.ComodeComponents.renderMath === 'function') {
      window.ComodeComponents.renderMath(target);
      return;
    }

    const doRender = () => {
      if (typeof window.renderMathInElement === 'function') {
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
        } catch (e) {
          console.warn('KaTeX render error:', e);
        }
      }
    };

    if (typeof window.renderMathInElement === 'function') {
      doRender();
    } else {
      window.addEventListener('load', doRender, { once: true });
    }
  }

  handleAnswer(selectedIdx) {
    if (this.answered) return;
    this.answered = true;

    const card = this.cards[this.currentIndex];
    const fb = document.getElementById(`${this.container.id}_fb`);
    const optButtons = this.container.querySelectorAll('.flashcard-opt-btn');
    const isCorrect = selectedIdx === card.correct;

    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === card.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    fb.style.display = 'block';

    if (isCorrect) {
      this.score++;
      if (window.ComodeAudio) window.ComodeAudio.playSuccess();
      if (window.ComodeGamification) {
        window.ComodeGamification.addXP(this.xpPerCard, `Risposta corretta alla carta ${this.currentIndex + 1}!`);
      }

      fb.className = 'flashcard-feedback correct';
      fb.innerHTML = `
        <div class="fb-header">✨ Risposta Esatta! (+${this.xpPerCard} XP)</div>
        <p class="fb-text">${card.explanation || 'Ottima intuizione!'}</p>
        <button class="btn-next-card" onclick="ComodeFlashcards.next('${this.container.id}')">
          Continua ➔
        </button>
      `;
    } else {
      if (window.ComodeAudio) window.ComodeAudio.playError();
      fb.className = 'flashcard-feedback wrong';
      fb.innerHTML = `
        <div class="fb-header">💡 Non proprio... Riflettiamo!</div>
        <p class="fb-text">${card.explanation || 'Rileggi il suggerimento e potrai riprovare il test a fine mazzo quante volte desideri!'}</p>
        <button class="btn-next-card" onclick="ComodeFlashcards.next('${this.container.id}')">
          Avanti ➔
        </button>
      `;
    }

    this.renderMath(fb);
  }

  next() {
    if (window.ComodeAudio) window.ComodeAudio.playClick();
    this.currentIndex++;
    this.render();
  }

  renderSummary() {
    const total = this.cards.length;
    const pct = Math.round((this.score / total) * 100);
    const isPerfect = this.score === total;

    if (isPerfect && !this.hasEarnedXPThisRun) {
      this.hasEarnedXPThisRun = true;
      if (window.ComodeGamification) {
        window.ComodeGamification.addXP(this.completionXP, 'Punteggio perfetto nelle Flashcard!');
      }
      if (window.ComodeAudio) window.ComodeAudio.playLevelUp();
    }

    this.container.innerHTML = `
      <div class="flashcard-summary-card">
        <div class="summary-badge-icon">${isPerfect ? '🏆' : (this.score > 0 ? '🌟' : '💪')}</div>
        <h3 class="summary-title">${isPerfect ? 'Mazzo Completato al 100%!' : 'Test Concluso!'}</h3>
        <p class="summary-desc">
          Hai risposto correttamente a <strong>${this.score} su ${total}</strong> domande (${pct}%).
          Nel Liceo delle Scienze Umane l'errore è lo strumento per capire dove migliorare!
        </p>

        <div class="summary-actions">
          <button class="btn-retry-deck" onclick="ComodeFlashcards.restart('${this.container.id}')">
            🔄 Ripeti il Test (Opzioni Rimescolate)
          </button>
        </div>
      </div>
    `;
  }

  restart() {
    if (window.ComodeAudio) window.ComodeAudio.playClick();
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.prepareCards();
    this.render();
  }
}

// Registry globale delle flashcards
window.ComodeFlashcards = {
  decks: {},
  init(containerId, options) {
    this.decks[containerId] = new ComodeFlashcardDeck(containerId, options);
    return this.decks[containerId];
  },
  handleAnswer(containerId, idx) {
    if (this.decks[containerId]) {
      this.decks[containerId].handleAnswer(idx);
    }
  },
  next(containerId) {
    if (this.decks[containerId]) {
      this.decks[containerId].next();
    }
  },
  restart(containerId) {
    if (this.decks[containerId]) {
      this.decks[containerId].restart();
    }
  }
};
