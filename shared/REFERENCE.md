# comode — Living Styleguide & Developer Reference

> **Guida centrale per lo sviluppo delle lezioni di `comode`**  
> *Consulta sempre questo file prima di scrivere nuove lezioni o aggiungere codice. Utilizza i mattoncini CSS, i moduli JavaScript e le librerie già presenti per mantenere il codice DRY, uniforme e privo di dipendenze inutili.*

---

## 1. Architettura delle Cartelle & Percorsi Relativi

Il progetto adotta la **Variante 2 (Radice per Ciclo di Studi)**:

```text
comode/
├── shared/
│   ├── css/
│   │   ├── theme.css           # Token di design, colori, reset e dark/light theme
│   │   ├── components.css      # Componenti UI (Navbar, Hero, Prerequisiti, Teoria, Lab, Flashcard, CLIL)
│   │   ├── gamification.css    # Toast, badge livelli, barra XP, completion card
│   │   └── comode.css          # Master stylesheet (@import di tutti i css)
│   ├── js/
│   │   ├── audio.js            # Sintetizzatore Web Audio API (zero file mp3)
│   │   ├── theme.js            # Switcher tema chiaro/scuro persistente
│   │   ├── gamification.js     # Motore XP, livelli, toast e completamento lezioni
│   │   ├── components.js       # KaTeX auto-render, accordion teoria, toggle hint
│   │   ├── flashcards.js       # Mazzo flashcard con Mastery Learning (tentativi infiniti)
│   │   ├── speech.js           # Sintesi vocale madrelingua Web Speech API per lezioni CLIL
│   │   └── comode.js           # Master loader e bind DOM
│   └── templates/
│       └── lesson-template.html # Template standard pronto da duplicare
├── primo-biennio/
│   ├── uda-1.1-insiemi-logica-algoritmi/
│   │   ├── lezione-01-calcolo-interi-razionali.html  # Singolo file autonomo
│   │   └── lezione-clil-numbers-mind-strategies.html
│   └── ... (altre 7 UDA)
├── secondo-biennio/
│   ├── matematica/ (4 UDA)
│   └── fisica/ (4 UDA)
├── quinto-anno/
│   ├── matematica/ (2 UDA)
│   └── fisica/ (2 UDA)
└── index.html                  # Hub iniziale della piattaforma
```

### ⚠️ Regola dei Percorsi Relativi (Depth)
- **Primo Biennio** (`primo-biennio/uda-X.X/`): si trova a **2 livelli di profondità**.  
  `href="../../shared/css/comode.css"` e `src="../../shared/js/..."`.
- **Secondo Biennio & Quinto Anno** (`secondo-biennio/matematica/uda-X.X/`): si trova a **3 livelli di profondità**.  
  `href="../../../shared/css/comode.css"` e `src="../../../shared/js/..."`.

---

## 2. Dipendenze Esterne Autorizzate

Per garantire caricamenti istantanei, privacy degli studenti e funzionamento offline/a bassa banda:
1. **Google Fonts (CDN):**
   - `Plus Jakarta Sans` (pesi 300, 400, 500, 600, 700, 800) per testo e UI.
   - `JetBrains Mono` (pesi 400, 500, 600, 700) per numeri, algebra e formule monospazio.
2. **KaTeX 0.16.9 (CDN jsDelivr):**
   - `katex.min.css`, `katex.min.js`, `contrib/auto-render.min.js`.
3. **Nessun file `.mp3` o libreria audio esterna:**
   - La riproduzione audio è affidata a `shared/js/audio.js` tramite **Web Audio API nativa** (generazione procedurale di onde sinusoidali: clic, success chime, error thud, hint chime, fanfare level-up).
4. **Nessun servizio cloud esterno per le lezioni CLIL:**
   - La pronuncia inglese dei termini scientifici è generata via **Web Speech API nativa** (`shared/js/speech.js`).

---

## 3. Token di Design CSS (`shared/css/theme.css`)

Utilizza **esclusivamente** queste variabili CSS, evitando colori esadecimali hardcodati:

| Variabile CSS | Scopo / Significato | Valore Dark (Default) | Valore Light |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | Sfondo principale pagina | `#090d16` | `#f8fafc` |
| `--bg-surface` | Sfondo card e box standard | `#111827` | `#ffffff` |
| `--bg-surface-elevated` | Sfondo elementi interattivi/hover | `#1f2937` | `#f1f5f9` |
| `--border-subtle` | Bordi di separazione e card | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` |
| `--text-main` | Testo primario ad alto contrasto | `#f3f4f6` | `#0f172a` |
| `--text-muted` | Testo secondario, sottotitoli | `#9ca3af` | `#64748b` |
| `--accent-math` | Colore identitario Matematica / Primario | `#38bdf8` (Azzurro Cielo) | `#0284c7` |
| `--accent-physics` | Colore identitario Fisica | `#f59e0b` (Ambra) | `#d97706` |
| `--accent-success` | Risposte corrette, completamento | `#10b981` (Smeraldo) | `#059669` |
| `--accent-danger` | Risposte errate, reset | `#f43f5e` (Rosa Corallo) | `#e11d48` |
| `--accent-warning` | Suggerimenti, prerequisiti | `#f59e0b` (Ambra) | `#d97706` |
| `--accent-purple` | CLIL, Metacognizione, Flashcards | `#a855f7` (Viola) | `#9333ea` |
| `--font-sans` | Famiglia tipografica principale | `'Plus Jakarta Sans', sans-serif` |
| `--font-mono` | Numeri, algebra, codice | `'JetBrains Mono', monospace` |

---

## 4. Catalogo Componenti HTML / CSS (`shared/css/components.css`)

### 4.1 Barra di Navigazione (`.navbar`)
```html
<nav class="navbar">
  <a href="../../index.html" class="brand">comode<span>.</span></a>
  <div class="nav-actions">
    <div class="gamification-widget" title="Il tuo livello e punti XP">
      <span class="level-badge user-level-val">Liv. 1 🌱</span>
      <span class="xp-counter user-xp-val">0 XP</span>
    </div>
    <button id="audioToggleBtn" class="icon-btn" aria-label="Audio">🔊 <span class="nav-text">Suoni</span></button>
    <button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Tema"><span id="themeIcon">☀️</span> <span id="themeLabel">Chiaro</span></button>
  </div>
</nav>
```

### 4.2 Breadcrumb (`.breadcrumbs`)
```html
<div class="breadcrumbs">
  <a href="../../index.html">Home</a><span class="sep">/</span>
  <a href="../index.html">Primo Biennio</a><span class="sep">/</span>
  <span>UDA 1.1: Insiemi, Logica e Algoritmi</span><span class="sep">/</span>
  <span class="current">Lezione 1.1</span>
</div>
```

### 4.3 Prerequisiti & Competenze in Uscita (`.prereq-objectives-grid`)
*Obbligatorio in ogni lezione, subito dopo la Hero Card:*
```html
<div class="prereq-objectives-grid">
  <!-- Prerequisiti -->
  <div class="prereq-card">
    <div class="card-top-label prereq"><span>🔑</span> Prerequisiti Consigliati</div>
    <h2 class="po-title">Cosa ti serve prima di iniziare</h2>
    <ul class="po-list">
      <li><span class="po-icon">✓</span><div><strong>Concetto 1:</strong> Descrizione prerequisito.</div></li>
    </ul>
  </div>

  <!-- Obiettivi / Competenze -->
  <div class="objectives-card">
    <div class="card-top-label objectives"><span>🎯</span> Competenze in Uscita</div>
    <h2 class="po-title">Cosa saprai fare alla fine della lezione</h2>
    <ul class="po-list">
      <li><span class="po-icon">🚀</span><div><strong>Competenza 1:</strong> Capacità pratica acquisita.</div></li>
    </ul>
  </div>
</div>
```

### 4.4 Laboratorio Operativo di Problem Solving (`.lab-card`)
```html
<article class="lab-card" id="lab1">
  <div class="lab-badge-row">
    <span class="lab-tag">Laboratorio 1</span>
    <span class="lab-xp-badge">+10 XP</span>
  </div>
  <h3 class="lab-title">Titolo Problema</h3>
  <p class="lab-question">Descrizione del contesto applicativo.</p>

  <div class="verify-box">
    <input type="text" id="lab1In" class="inline-input" placeholder="Tua risposta...">
    <button class="btn-action" onclick="verifyLab1()">Verifica Risposta</button>
    <span id="lab1Msg" class="feedback-msg" style="display: none;"></span>
  </div>
</article>
```

### 4.5 Sezione Flashcards con Ripetizione Illimitata (`.flashcard-section`)
```html
<section class="flashcard-section" id="flashcardSection">
  <div class="section-header">
    <h2 class="section-title"><span class="icon">🃏</span> Flashcards di Autovalutazione (+15 XP per carta)</h2>
    <span class="tag info-tag" style="background: rgba(56, 189, 248, 0.12); color: var(--accent-math); padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">🔁 Tentativi Infiniti</span>
  </div>
  <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
    Mettiti alla prova con le flashcard operative. Puoi ripetere il test tutte le volte che vuoi!
  </p>
  <div id="lessonFlashcardDeck"></div>
</section>
```

### 4.6 Tabella Glossario Bilingue CLIL con Audio (`.clil-glossary-card`)
```html
<div class="clil-glossary-card">
  <div class="clil-glossary-header">
    <h3 style="font-size: 1.2rem; font-weight: 800;">📖 Interactive Bilingual Glossary</h3>
    <span style="font-size: 0.85rem; color: var(--text-muted);">Clicca sull'icona 🔊 per ascoltare la corretta pronuncia</span>
  </div>
  <div class="clil-table-wrapper">
    <table class="clil-table">
      <thead>
        <tr><th>English Term</th><th>Termine Italiano</th><th>Math Context & Example</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span class="term-en">Common Denominator</span>
            <button class="speech-btn" onclick="speakWord('common denominator')">🔊 Pronounce</button>
          </td>
          <td><span class="term-it">Denominatore Comune</span></td>
          <td><span class="term-context">The lowest shared multiple used to add fractions ($1/3 + 1/4 = 7/12$).</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 4.7 Card di Completamento Gamification (`.completion-card`)
```html
<div class="completion-card" id="lessonCompletionCard">
  <div class="completion-icon">🏆</div>
  <h3 class="completion-title">Hai completato la Lezione?</h3>
  <p class="completion-desc">Registra il tuo traguardo per guadagnare i tuoi punti esperienza finali (+60 XP) e salire di livello!</p>
  <button id="btnCompleteLesson" class="btn-complete">✨ Segna come Completata (+60 XP)</button>
</div>
```

---

## 5. API JavaScript Centralizzate

### 5.1 `window.ComodeAudio` (`shared/js/audio.js`)
Generatore sonoro procedurale non intrusivo:
- `ComodeAudio.playClick()`: Clic discreto al tocco dei bottoni.
- `ComodeAudio.playSuccess()`: Armonico ascendente a due toni per risposta corretta.
- `ComodeAudio.playError()`: Tono sordo e smorzato per errore didattico non penalizzante.
- `ComodeAudio.playHint()`: Campanellino per apertura suggerimento/trucco.
- `ComodeAudio.playLevelUp()`: Fanfara di 4 note per avanzamento livello.
- `ComodeAudio.toggleMute()`: Inverte stato audio (salvato in `localStorage`).

### 5.2 `window.ComodeGamification` (`shared/js/gamification.js`)
Persistenza automatica su `localStorage` (`comode_xp`, `comode_completed_lessons`):
- `ComodeGamification.addXP(amount, reason)`: Assegna punti XP e mostra toast di notifica animato in alto a destra.
- `ComodeGamification.getXP()`: Restituisce il punteggio XP totale dell'utente.
- `ComodeGamification.getLevel()`: Calcola il livello (da Liv. 1 🌱 *Novizio* a Liv. 10 👑 *Maestro Assoluto*).
- `ComodeGamification.markLessonCompleted(lessonId, rewardXP)`: Salva il completamento della lezione (impedisce farming di completamenti multipli ma permette di rieseguire i laboratori).

### 5.3 `window.ComodeFlashcards` (`shared/js/flashcards.js`)
Motore di quiz a flashcard basato su **Mastery Learning**:
- Inizializzazione:
```javascript
ComodeFlashcards.init('lessonFlashcardDeck', {
  deckId: 'pb-1.1-flashcards',
  xpPerCard: 15,
  completionXP: 25,
  cards: [
    {
      category: 'Nome Categoria',
      question: 'Testo domanda con formule KaTeX $48 \\times 0,25$?',
      options: [
        'Opzione A',
        'Opzione B corretta ($x = \\pm 2$)',
        'Opzione C',
        'Opzione D'
      ],
      correct: 1, // Indice 0-based
      explanation: 'Spiegazione concettuale mostrata subito dopo la risposta.'
    }
  ]
});
```

> [!IMPORTANT]
> **Regola d'oro KaTeX nelle stringhe JavaScript:**  
> Nelle stringhe JS scrivi **sempre il doppio backslash** per i comandi LaTeX (`$\\frac{1}{4}$`, `$a \\times b$`, `$\\pm 2$`).  
> Se scrivi `\frac` con backslash singolo, JavaScript lo interpreta come carattere speciale di controllo *Form Feed* (`\f`) rompendo la visualizzazione della frazione!

### 5.4 `window.ComodeSpeech` (`shared/js/speech.js`)
Sintesi vocale madrelingua per lezioni CLIL:
- `ComodeSpeech.speak(text, lang = 'en-US')`
- Oppure direttamente da HTML: `<button onclick="speakWord('reciprocal')">🔊 Ascolta</button>`

### 5.5 `window.ComodeTheme` (`shared/js/theme.js`)
- `ComodeTheme.toggleTheme()`: Alterna tema scuro (`data-theme="dark"`) e chiaro (`data-theme="light"`).

---

## 6. Checklist di Creazione Nuova Lezione

Prima di pubblicare una nuova lezione:
1. [ ] Hai duplicato `shared/templates/lesson-template.html`?
2. [ ] I percorsi relativi a `shared/` rispettano la profondità (`../../` per biennio, `../../../` per triennio)?
3. [ ] Sono presenti le due card **Prerequisiti** e **Competenze in Uscita**?
4. [ ] Le frazioni nelle flashcard usano il doppio backslash (`$\\frac{a}{b}$`)?
5. [ ] Il tag `body` ha `data-lesson-id="univoco"` e `data-xp="60"`?
6. [ ] C'è esattamente **1 solo file HTML** all'interno della cartella dell'UDA?
7. [ ] Se è una lezione **CLIL**, è presente il glossario bilingue con bottoni `speakWord(...)` e problemi in inglese?
