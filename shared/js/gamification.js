/**
 * comode — gamification.js
 * Motore di Gamification: XP, Livelli, Titoli UDA Collezionabili, Lezioni completate e Toast.
 * Salva lo stato in localStorage (client-side, 100% gratuito e zero problemi GDPR).
 */

class ComodeGamification {
  constructor() {
    this.storageKey = 'comode-user-profile';

    // Livelli Globali XP
    this.levels = [
      { minXp: 0, level: 1, title: 'Novizio del Pensiero', badge: '🌱' },
      { minXp: 100, level: 2, title: 'Esploratore dei Numeri', badge: '🔍' },
      { minXp: 250, level: 3, title: 'Apprendista Pitagorico', badge: '📐' },
      { minXp: 500, level: 4, title: 'Costruttore di Modelli', badge: '⚡' },
      { minXp: 1000, level: 5, title: 'Maestro di Problem Solving', badge: '👑' }
    ];

    // Titolo Supremo: si sblocca sbloccando tutti i 20 titoli del sito
    this.masterTitle = {
      id: 'uda-master-all',
      code: 'TRAGUARDO SUPREMO',
      title: 'Tutte le 20 UDA del Quinquennio',
      earnedTitle: 'Maestro Assoluto del Problem Solving',
      badge: '👑',
      cycle: 'master',
      cycleLabel: 'Traguardo Supremo',
      subject: 'Matematica & Fisica',
      howToEarn: 'Conquista tutti i 20 titoli delle UDA del sito completando le unità didattiche del Primo Biennio, Secondo Biennio e Quinto Anno.'
    };

    // Registro Ufficiale di tutte le 20 UDA del Quinquennio (Liceo Scienze Umane)
    this.udas = [
      // PRIMO BIENNIO (Solo Matematica)
      {
        id: 'uda-1.1',
        code: 'UDA 1.1',
        title: 'Insiemi, Logica e Algoritmi',
        earnedTitle: 'Architetto della Logica',
        badge: '📐',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-1.1-l01', 'pb-1.1-clil'],
        howToEarn: 'Completa la Lezione 1.1 (Calcolo Interi e Razionali) e la Lezione CLIL (Numbers & Mental Strategies).'
      },
      {
        id: 'uda-1.2',
        code: 'UDA 1.2',
        title: 'Calcolo Letterale ed Equazioni',
        earnedTitle: 'Mastro Algebrista',
        badge: '⚖️',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-1.2-l01'],
        howToEarn: 'Completa i laboratori guidati su monomi, polinomi, prodotti notevoli ed equazioni lineari di 1° grado.'
      },
      {
        id: 'uda-1.3',
        code: 'UDA 1.3',
        title: 'Geometria Euclidea e Aree',
        earnedTitle: 'Geometra di Mileto',
        badge: '🏛️',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-1.3-l01'],
        howToEarn: 'Risolvi i problemi di dimostrazione euclidea sui triangoli e il calcolo ragionato delle aree.'
      },
      {
        id: 'uda-1.4',
        code: 'UDA 1.4',
        title: 'Dati, Statistica Descrittiva e UX',
        earnedTitle: 'Scienziato dei Dati & UX',
        badge: '📊',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-1.4-l01'],
        howToEarn: 'Elabora tabelle di frequenza, calcola media, mediana e moda, e valida un test di usabilità (UX).'
      },
      {
        id: 'uda-2.1',
        code: 'UDA 2.1',
        title: 'Reali, Radicali e 2° Grado',
        earnedTitle: "Esploratore dell'Infinito Reale",
        badge: '♾️',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-2.1-l01'],
        howToEarn: 'Risolvi le equazioni di 2° grado e padroneggia le operazioni con i radicali nell’insieme dei numeri reali.'
      },
      {
        id: 'uda-2.2',
        code: 'UDA 2.2',
        title: 'Funzioni, Grafici e Trasformazioni',
        earnedTitle: 'Cartografo delle Funzioni',
        badge: '📈',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-2.2-l01'],
        howToEarn: 'Rappresenta le funzioni nel piano cartesiano e modella le trasformazioni geometriche (traslazioni e simmetrie).'
      },
      {
        id: 'uda-2.3',
        code: 'UDA 2.3',
        title: 'Sistemi Lineari, Similitudine e Solidi',
        earnedTitle: 'Scultore delle Dimensioni',
        badge: '🧊',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-2.3-l01'],
        howToEarn: 'Risolvi sistemi lineari di equazioni e affronta compiti autentici su solidi geometrici e similitudine.'
      },
      {
        id: 'uda-2.4',
        code: 'UDA 2.4',
        title: 'Probabilità, Simulazione e Rischio',
        earnedTitle: "Tattico dell'Incertezza",
        badge: '🎲',
        cycle: 'primo-biennio',
        cycleLabel: 'Primo Biennio',
        subject: 'Matematica',
        requiredLessons: ['pb-2.4-l01'],
        howToEarn: 'Conduci simulazioni probabilistiche con dati reali e modella scenari di rischio e decisione razionale.'
      },

      // SECONDO BIENNIO (Matematica & Fisica)
      {
        id: 'uda-3.m1',
        code: 'UDA 3.M1',
        title: 'Vettori, Analitica e Sistemi',
        earnedTitle: 'Navigatore Vettoriale',
        badge: '🧭',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Matematica',
        requiredLessons: ['sb-3.m1-l01'],
        howToEarn: 'Padroneggia le operazioni vettoriali nel piano e le equazioni della retta nella geometria analitica.'
      },
      {
        id: 'uda-3.f1',
        code: 'UDA 3.F1',
        title: 'Misure, Cinematica e Gravi',
        earnedTitle: 'Cronista del Moto',
        badge: '⏱️',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Fisica',
        requiredLessons: ['sb-3.f1-l01'],
        howToEarn: 'Analizza i moti rettilinei (uniforme e accelerato), il moto dei gravi e l’incertezza sperimentale.'
      },
      {
        id: 'uda-3.m2',
        code: 'UDA 3.M2',
        title: 'Modelli Quadratici, Coniche e Calcolo',
        earnedTitle: 'Tracciatore di Orbite',
        badge: '🪐',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Matematica',
        requiredLessons: ['sb-3.m2-l01'],
        howToEarn: 'Modella parabole, circonferenze, ellissi e iperboli risolvendo problemi di ottimizzazione geometrica.'
      },
      {
        id: 'uda-3.f2',
        code: 'UDA 3.F2',
        title: 'Dinamica, Piano Inclinato ed Energia',
        earnedTitle: 'Domatore delle Forze',
        badge: '⚡',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Fisica',
        requiredLessons: ['sb-3.f2-l01'],
        howToEarn: 'Applica i tre principi della dinamica di Newton, l’equilibrio sul piano inclinato e il teorema lavoro-energia.'
      },
      {
        id: 'uda-4.m1',
        code: 'UDA 4.M1',
        title: 'Esponenziali, Logaritmi e Onde',
        earnedTitle: 'Armonizzatore delle Onde',
        badge: '🌊',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Matematica',
        requiredLessons: ['sb-4.m1-l01'],
        howToEarn: 'Risolvi modelli di crescita esponenziale, equazioni logaritmiche e funzioni goniometriche periodiche.'
      },
      {
        id: 'uda-4.f1',
        code: 'UDA 4.F1',
        title: 'Moti Periodici, Gravitazione e Suono',
        earnedTitle: 'Accordatore del Cosmo',
        badge: '🌌',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Fisica',
        requiredLessons: ['sb-4.f1-l01'],
        howToEarn: 'Modella il moto armonico, le leggi di Keplero, la gravitazione universale e le onde sonore.'
      },
      {
        id: 'uda-4.m2',
        code: 'UDA 4.M2',
        title: 'Statistica Bivariata e Teorema di Bayes',
        earnedTitle: 'Oracolo Bayesiano',
        badge: '🔮',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Matematica',
        requiredLessons: ['sb-4.m2-l01'],
        howToEarn: 'Calcola la retta di regressione bivariata e risolvi problemi di probabilità condizionata con Bayes.'
      },
      {
        id: 'uda-4.f2',
        code: 'UDA 4.F2',
        title: 'Termologia, Ottica e Visione',
        earnedTitle: 'Signore della Luce e del Calore',
        badge: '💡',
        cycle: 'secondo-biennio',
        cycleLabel: 'Secondo Biennio',
        subject: 'Fisica',
        requiredLessons: ['sb-4.f2-l01'],
        howToEarn: 'Completa le indagini su dilatazione termica, calorimetria, propagazione della luce, rifrazione e visione umana.'
      },

      // QUINTO ANNO (Matematica & Fisica)
      {
        id: 'uda-5.m1',
        code: 'UDA 5.M1',
        title: 'Limiti, Continuità e Derivate',
        earnedTitle: "Signore dell'Infinitesimo",
        badge: '🌀',
        cycle: 'quinto-anno',
        cycleLabel: 'Quinto Anno',
        subject: 'Matematica',
        requiredLessons: ['qa-5.m1-l01'],
        howToEarn: 'Calcola i limiti di funzione, rimuovi le forme indeterminate e determina derivata e retta tangente.'
      },
      {
        id: 'uda-5.f1',
        code: 'UDA 5.F1',
        title: 'Termodinamica ed Elettromagnetismo',
        earnedTitle: "Custode dell'Entropia & dei Campi",
        badge: '🔋',
        cycle: 'quinto-anno',
        cycleLabel: 'Quinto Anno',
        subject: 'Fisica',
        requiredLessons: ['qa-5.f1-l01'],
        howToEarn: 'Modella il primo e secondo principio della termodinamica, il campo elettrico e la legge di induzione di Faraday.'
      },
      {
        id: 'uda-5.m2',
        code: 'UDA 5.M2',
        title: 'Studio di Funzione, Integrali ed Epistemologia',
        earnedTitle: 'Filosofo della Scienza',
        badge: '📜',
        cycle: 'quinto-anno',
        cycleLabel: 'Quinto Anno',
        subject: 'Matematica',
        requiredLessons: ['qa-5.m2-l01'],
        howToEarn: 'Conduci lo studio completo di una funzione reale, calcola integrali definiti e scrivi un saggio epistemologico.'
      },
      {
        id: 'uda-5.f2',
        code: 'UDA 5.F2',
        title: 'Onde EM, Quanti, Sistemi Complessi e IA',
        earnedTitle: 'Visionario dei Sistemi Complessi',
        badge: '🧠',
        cycle: 'quinto-anno',
        cycleLabel: 'Quinto Anno',
        subject: 'Fisica',
        requiredLessons: ['qa-5.f2-l01'],
        howToEarn: 'Indaga le equazioni di Maxwell, la dualità onda-corpuscolo, i modelli del caos e le reti neurali artificiali.'
      }
    ];

    this.profile = this.loadProfile();
  }

  loadProfile() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.unlockedTitles) parsed.unlockedTitles = [];
        if (!parsed.completedLessons) parsed.completedLessons = [];
        if (typeof parsed.xp !== 'number') parsed.xp = 0;
        return parsed;
      }
    } catch (e) {
      console.warn('Impossibile caricare profilo da localStorage', e);
    }
    return {
      xp: 0,
      completedLessons: [],
      unlockedTitles: [],
      badges: []
    };
  }

  saveProfile() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.profile));
      this.syncUI();
    } catch (e) {
      console.warn('Impossibile salvare profilo in localStorage', e);
    }
  }

  getXP() {
    return this.profile.xp;
  }

  getLevel() {
    return this.getLevelInfo();
  }

  getLevelInfo(xp = this.profile.xp) {
    let current = this.levels[0];
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (xp >= this.levels[i].minXp) {
        current = this.levels[i];
        break;
      }
    }
    return current;
  }

  addXP(amount, reason = '') {
    const oldLevel = this.getLevelInfo(this.profile.xp).level;
    this.profile.xp += amount;
    const newLevel = this.getLevelInfo(this.profile.xp);

    this.saveProfile();

    if (newLevel.level > oldLevel) {
      if (window.ComodeAudio) window.ComodeAudio.playLevelUp();
      this.showToast(
        `🎉 Salita di Livello: Liv. ${newLevel.level}!`,
        `Complimenti! Sei ora "${newLevel.title}".`,
        newLevel.badge
      );
    } else {
      if (window.ComodeAudio) window.ComodeAudio.playSuccess();
      this.showToast(`+${amount} XP Guadagnati!`, reason || 'Ottimo lavoro nel laboratorio.', '⭐');
    }
  }

  isLessonCompleted(lessonId) {
    return this.profile.completedLessons.includes(lessonId);
  }

  isUDAUnlocked(udaId) {
    return this.profile.unlockedTitles.some(t => t.udaId === udaId);
  }

  getUDAProgress(udaId) {
    const uda = this.udas.find(u => u.id === udaId);
    if (!uda) return { completed: 0, total: 1, isUnlocked: false, percent: 0 };

    const total = uda.requiredLessons.length;
    const completed = uda.requiredLessons.filter(lId => this.isLessonCompleted(lId)).length;
    const isUnlocked = this.isUDAUnlocked(udaId) || (total > 0 && completed >= total);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, isUnlocked, percent };
  }

  isMasterUnlocked() {
    if (this.profile.unlockedTitles.some(t => t.udaId === this.masterTitle.id)) return true;
    return this.udas.length > 0 && this.udas.every(u => this.isUDAUnlocked(u.id));
  }

  checkUDACompletion() {
    let newlyUnlocked = false;

    this.udas.forEach(uda => {
      const allDone = uda.requiredLessons.length > 0 &&
                      uda.requiredLessons.every(lId => this.isLessonCompleted(lId));

      if (allDone && !this.isUDAUnlocked(uda.id)) {
        this.profile.unlockedTitles.push({
          udaId: uda.id,
          code: uda.code,
          earnedTitle: uda.earnedTitle,
          badge: uda.badge,
          unlockedAt: new Date().toLocaleDateString('it-IT')
        });
        newlyUnlocked = true;

        if (window.ComodeAudio) window.ComodeAudio.playLevelUp();
        this.showToast(
          `🏆 TITOLO CONQUISTATO: "${uda.earnedTitle}"!`,
          `Hai completato tutti i requisiti di ${uda.code}: ${uda.title}. Titolo aggiunto alla tua Bacheca!`,
          uda.badge
        );
      }
    });

    // Controllo Titolo Supremo: sbloccato se tutti i 20 titoli delle UDA sono stati sbloccati
    const allUDAsUnlocked = this.udas.length > 0 && this.udas.every(u => this.isUDAUnlocked(u.id));
    if (allUDAsUnlocked && !this.profile.unlockedTitles.some(t => t.udaId === this.masterTitle.id)) {
      this.profile.unlockedTitles.push({
        udaId: this.masterTitle.id,
        code: this.masterTitle.code,
        earnedTitle: this.masterTitle.earnedTitle,
        badge: this.masterTitle.badge,
        unlockedAt: new Date().toLocaleDateString('it-IT')
      });
      newlyUnlocked = true;

      if (window.ComodeAudio) window.ComodeAudio.playLevelUp();
      this.showToast(
        `👑 TITOLO SUPREMO SBLOCCATO: "${this.masterTitle.earnedTitle}"!`,
        `Incredibile! Hai completato tutte le 20 UDA del sito conquistando il Titolo Supremo!`,
        '👑'
      );
    }

    if (newlyUnlocked) {
      this.saveProfile();
    }
  }

  markLessonCompleted(lessonId, xpReward = 50) {
    this.completeLesson(lessonId, xpReward);
  }

  completeLesson(lessonId, xpReward = 50) {
    if (!lessonId) return;

    if (this.isLessonCompleted(lessonId)) {
      this.showToast('Lezione già completata', 'Hai già registrato i punti per questa lezione in passato.', 'ℹ️');
      return;
    }

    this.profile.completedLessons.push(lessonId);
    this.addXP(xpReward, 'Lezione completata con successo!');
    this.updateLessonCompletionUI(true);

    // Controlla subito se questo completamento sblocca il titolo dell'UDA!
    this.checkUDACompletion();
  }

  showToast(title, desc, icon = '✨') {
    let container = document.getElementById('comodeToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'comodeToastContainer';
      container.className = 'comode-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'comode-toast';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  syncUI() {
    const xpDisplays = document.querySelectorAll('.user-xp-val');
    xpDisplays.forEach(el => { el.textContent = `${this.profile.xp} XP`; });

    const lvlDisplays = document.querySelectorAll('.user-level-val');
    const lvlInfo = this.getLevelInfo();
    lvlDisplays.forEach(el => { el.textContent = `Liv. ${lvlInfo.level} ${lvlInfo.badge}`; });

    const titlesCount = document.querySelectorAll('.user-titles-count');
    titlesCount.forEach(el => { el.textContent = `${this.profile.unlockedTitles.length}`; });
  }

  updateLessonCompletionUI(isDone) {
    const btn = document.getElementById('btnCompleteLesson');
    const card = document.getElementById('lessonCompletionCard');
    if (btn) {
      if (isDone) {
        btn.classList.add('completed-state');
        btn.innerHTML = '<span>Completata con Successo</span> ✓';
        btn.disabled = true;
      }
    }
    if (card && isDone) {
      card.classList.add('is-completed');
    }
  }

  // Renderizza la Bacheca dei Titoli in un elemento contenitore (es. nella Home Page)
  renderTrophyBoard(containerId = 'trophyBoardContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Controlla anzitutto se ci sono titoli appena sbloccati
    this.checkUDACompletion();

    const unlockedUDACount = this.udas.filter(u => this.isUDAUnlocked(u.id)).length;
    const totalUDACount = this.udas.length;
    const isMasterDone = this.isMasterUnlocked();
    const pctUnlocked = Math.round((unlockedUDACount / totalUDACount) * 100);
    const lvlInfo = this.getLevelInfo();
    const masterUnlockedData = this.profile.unlockedTitles.find(t => t.udaId === this.masterTitle.id);

    container.innerHTML = `
      <div class="trophy-board">
        <!-- Header Bacheca -->
        <div class="trophy-header">
          <div class="trophy-header-left">
            <div class="trophy-main-badge">🏆</div>
            <div>
              <h2 class="trophy-title">Bacheca dei Titoli &amp; Traguardi</h2>
              <p class="trophy-subtitle">
                Colleziona i titoli didattici completando le unità del quinquennio. Per ogni titolo scopri esattamente <strong>cosa fare per acquisirlo</strong> e punta al <strong>Titolo Supremo</strong>!
              </p>
            </div>
          </div>
          <div class="trophy-header-stats">
            <div class="trophy-stat-pill">
              <span class="stat-label">Titoli Acquisiti:</span>
              <span class="stat-value"><strong id="trophyUnlockedCounter">${unlockedUDACount}</strong> / ${totalUDACount}</span>
            </div>
            <div class="trophy-stat-pill">
              <span class="stat-label">Titolo Supremo:</span>
              <span class="stat-value" style="color: var(--accent-gold);">${isMasterDone ? '👑 SBLOCCATO' : '🔒 Bloccato'}</span>
            </div>
            <div class="trophy-stat-pill">
              <span class="stat-label">Punti Esperienza:</span>
              <span class="stat-value user-xp-val" style="color: var(--accent-gold);">${this.profile.xp} XP</span>
            </div>
          </div>
        </div>

        <!-- Barra di Completamento Globale -->
        <div class="trophy-global-progress">
          <div class="progress-track" style="height: 8px;">
            <div class="progress-bar-fill" style="width: ${pctUnlocked}%;"></div>
          </div>
          <div class="progress-meta-text">
            <span>Progresso Quinquennio: <strong>${pctUnlocked}%</strong> completato (${unlockedUDACount} di ${totalUDACount} UDA)</span>
            <span>Grado Attuale: <strong>${lvlInfo.title} (${lvlInfo.badge})</strong></span>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TITOLO SUPREMO: Sbloccabile completando tutti i titoli   -->
        <!-- ======================================================== -->
        <div class="trophy-master-banner ${isMasterDone ? 'unlocked' : 'locked'}">
          <div class="master-banner-badge-wrap">
            <span class="master-banner-badge">👑</span>
          </div>
          <div class="master-banner-content">
            <div class="master-banner-top">
              <span class="master-banner-pill">🌟 Titolo Supremo del Portale</span>
              <span class="master-status-tag ${isMasterDone ? 'tag-unlocked' : 'tag-locked'}">
                ${isMasterDone ? 'ACQUISITO ✓' : 'DA SBLOCCARE 🔒'}
              </span>
            </div>
            <h3 class="master-banner-title">${this.masterTitle.earnedTitle}</h3>
            <p class="master-banner-sub">${this.masterTitle.title} • Liceo delle Scienze Umane</p>
            <div class="trophy-how-to master-how-to">
              <span class="how-to-label">🎯 Cosa fare per acquisire il Titolo Supremo:</span>
              <span class="how-to-desc">${this.masterTitle.howToEarn}</span>
            </div>
            ${isMasterDone && masterUnlockedData ? `
              <div class="trophy-unlocked-badge" style="margin-top: 0.5rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Conquistato il ${masterUnlockedData.unlockedAt}</span>
              </div>
            ` : ''}
          </div>
          <div class="master-banner-progress">
            <div class="master-progress-label">
              <span>Progresso Sblocco:</span>
              <strong>${unlockedUDACount} / ${totalUDACount}</strong>
            </div>
            <div class="master-track">
              <div class="master-fill" style="width: ${pctUnlocked}%;"></div>
            </div>
            <div class="master-progress-sub">
              ${isMasterDone 
                ? '<span style="color: var(--accent-success); font-weight: 700;">👑 Traguardo Supremo Raggiunto!</span>' 
                : `<span>Mancano <strong>${totalUDACount - unlockedUDACount}</strong> titoli per sbloccarlo</span>`}
            </div>
          </div>
        </div>

        <!-- Filtri Ciclo per la Bacheca -->
        <div class="trophy-filter-row">
          <button class="trophy-pill active" data-trophy-filter="all">Tutti (${totalUDACount})</button>
          <button class="trophy-pill" data-trophy-filter="primo-biennio">Primo Biennio (8)</button>
          <button class="trophy-pill" data-trophy-filter="secondo-biennio">Secondo Biennio (8)</button>
          <button class="trophy-pill" data-trophy-filter="quinto-anno">Quinto Anno (4)</button>
          <button class="trophy-pill highlight" data-trophy-filter="unlocked">Acquisiti (${unlockedUDACount})</button>
        </div>

        <!-- Griglia dei Titoli UDA con 'Cosa fare per acquisirli' -->
        <div class="trophy-grid" id="trophyGrid">
          ${this.udas.map(uda => {
            const prog = this.getUDAProgress(uda.id);
            const isUnlocked = prog.isUnlocked;
            const unlockedData = this.profile.unlockedTitles.find(t => t.udaId === uda.id);
            const dateStr = unlockedData ? `Conquistato il ${unlockedData.unlockedAt}` : 'Acquisito ✓';

            return `
              <div class="trophy-card ${isUnlocked ? 'unlocked' : 'locked'}"
                   data-cycle="${uda.cycle}"
                   data-unlocked="${isUnlocked ? 'true' : 'false'}"
                   data-uda-id="${uda.id}">
                
                <div class="trophy-card-top">
                  <div class="trophy-badge-wrap">
                    <span class="trophy-badge">${isUnlocked ? uda.badge : '🔒'}</span>
                  </div>
                  <div class="trophy-top-meta">
                    <span class="trophy-code-tag ${uda.subject === 'Fisica' ? 'phys' : 'math'}">
                      ${uda.code} • ${uda.subject}
                    </span>
                    <span class="trophy-status-pill ${isUnlocked ? 'status-unlocked' : 'status-locked'}">
                      ${isUnlocked ? 'Acquisito ✓' : 'Da Acquisire'}
                    </span>
                  </div>
                </div>

                <div class="trophy-name">${uda.earnedTitle}</div>
                <div class="trophy-uda-topic">${uda.title}</div>

                <!-- Sezione 'Cosa fare per acquisire il titolo' -->
                <div class="trophy-how-to">
                  <span class="how-to-label">🎯 Cosa fare per acquisirlo:</span>
                  <span class="how-to-desc">${uda.howToEarn}</span>
                </div>

                <div class="trophy-card-footer">
                  ${isUnlocked ? `
                    <div class="trophy-unlocked-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>${dateStr}</span>
                    </div>
                  ` : `
                    <div class="trophy-progress-wrap">
                      <div class="trophy-mini-track">
                        <div class="trophy-mini-fill" style="width: ${prog.percent}%;"></div>
                      </div>
                      <div class="trophy-mini-info">
                        <span>${prog.completed}/${prog.total} requisiti completati</span>
                        <span>${prog.percent}%</span>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Aggiungi interattività ai filtri della bacheca
    const filterPills = container.querySelectorAll('[data-trophy-filter]');
    const cards = container.querySelectorAll('.trophy-card');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-trophy-filter');
        cards.forEach(card => {
          const cardCycle = card.getAttribute('data-cycle');
          const isUnlocked = card.getAttribute('data-unlocked') === 'true';

          let show = false;
          if (filter === 'all') show = true;
          else if (filter === 'unlocked') show = isUnlocked;
          else if (filter === cardCycle) show = true;

          card.style.display = show ? 'flex' : 'none';
        });
      });
    });
  }

  // Reset progressi (utile per verifiche o ripartire da zero)
  resetProgress() {
    if (confirm("Vuoi azzerare tutti i punti e i titoli conquistati su questo browser?")) {
      localStorage.removeItem(this.storageKey);
      this.profile = this.loadProfile();
      this.syncUI();
      this.renderTrophyBoard();
      this.showToast('Progresso Azzerato', 'Il profilo locale è stato resettato con successo.', '🔄');
    }
  }

  initPageHooks() {
    this.syncUI();

    const lessonId = document.body.getAttribute('data-lesson-id');
    const lessonXP = parseInt(document.body.getAttribute('data-xp'), 10) || 50;

    if (lessonId && this.isLessonCompleted(lessonId)) {
      this.updateLessonCompletionUI(true);
    }

    const btn = document.getElementById('btnCompleteLesson');
    if (btn && lessonId && !btn._comodeBound) {
      btn._comodeBound = true;
      btn.addEventListener('click', () => {
        this.completeLesson(lessonId, lessonXP);
      });
    }

    // Audio Toggle nella Navbar
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn && !audioBtn._comodeBound) {
      audioBtn._comodeBound = true;
      const updateAudioIcon = () => {
        const isMuted = window.ComodeAudio.isMuted;
        audioBtn.innerHTML = isMuted ? '🔇 <span class="nav-text">Muto</span>' : '🔊 <span class="nav-text">Suoni</span>';
      };
      updateAudioIcon();
      audioBtn.addEventListener('click', () => {
        window.ComodeAudio.toggleMute();
        updateAudioIcon();
      });
    }

    // Se la pagina ha il contenitore della bacheca, renderizzalo
    if (document.getElementById('trophyBoardContainer')) {
      this.renderTrophyBoard('trophyBoardContainer');
    }
  }
}

window.ComodeGamification = new ComodeGamification();
