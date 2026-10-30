# comode — Living Styleguide & Developer Reference

> **Guida architetturale e didattica per lo sviluppo di `comode`**  
> *Consulta sempre questo documento prima di creare nuove UDA, scrivere lezioni o modificare gli stili. Utilizza esclusivamente i token CSS, i moduli JavaScript e le librerie approvate per mantenere il codice DRY, modulare, accessibile e privo di dipendenze superflue.*

---

## 1. Architettura delle Cartelle & Percorsi Relativi

Il progetto adotta un'architettura **Zero-Build, Modulare e Organizzata per Ciclo di Studi**:

```text
comode/
├── shared/
│   ├── css/
│   │   ├── theme.css              # Design tokens, palette dark/light, reset e scudo globale KaTeX
│   │   ├── components.css         # Componenti UI (Navbar, Teoria, Theory-Link, Lab, Flashcard, Scheda Operativa, Stampa)
│   │   ├── gamification.css       # Toast notifiche, badge livelli, barra XP, completion card
│   │   ├── storybook.css          # Design system e stili dedicati alle Favole Interattive
│   │   └── comode.css             # Master stylesheet (@import centralizzato di tutti i CSS)
│   ├── js/
│   │   ├── audio.js               # Sintetizzatore procedurale Web Audio API (zero file .mp3)
│   │   ├── theme.js               # Switcher tema chiaro/scuro persistente su html e body
│   │   ├── gamification.js        # Motore XP, livelli, titoli UDA, toast e completamento lezioni
│   │   ├── components.js          # Rendering KaTeX DRY, scrollToTheory(), accordion teoria, toggleHint()
│   │   ├── flashcards.js          # Mazzo flashcard Mastery Learning con shuffle anti-ripetizione
│   │   ├── speech.js              # Sintesi vocale madrelingua Web Speech API per lezioni CLIL
│   │   └── comode.js              # Bootstrapper centrale al DOMContentLoaded
│   ├── story/
│   │   └── personaggi/            # Schede visive dei personaggi fissi (Vela, mamma, papà, zio)
│   ├── templates/
│   │   ├── lesson-template.html   # Template standard per nuove lezioni curricolari
│   │   └── story-template.html    # Template standard per nuove favole interattive
│   └── REFERENCE.md               # Questa guida di riferimento tecnico e didattico
├── primo-biennio/
│   ├── index.html                 # Hub delle 8 UDA di Matematica del 1° e 2° anno
│   ├── uda-1.1-insiemi-logica-algoritmi/
│   │   ├── index.html                                # Hub dell'UDA (Favola, 5 lezioni curricolari, CLIL, titolo UDA)
│   │   ├── favola-interattiva-i-numeri.html          # Favola Interattiva dell'UDA 1.1 (Vela e le fragole)
│   │   ├── illustrazioni-favola/                     # Tavole illustrate della favola dell'UDA
│   │   ├── lezione-01-calcolo-interi-razionali.html  # Lezione 1.1 (Attiva)
│   │   ├── lezione-02-retta-scale-notazione.html     # Lezione 1.2 (In sviluppo)
│   │   ├── lezione-03-potenze-numeri-primi-euclide.html # Lezione 1.3 (In sviluppo)
│   │   ├── lezione-04-insiemi-logica-linguaggio.html # Lezione 1.4 (In sviluppo)
│   │   ├── lezione-05-primi-algoritmi-flowchart.html # Lezione 1.5 (In sviluppo)
│   │   └── lezione-clil-numbers-mind-strategies.html # Modulo CLIL in lingua inglese (Attiva)
│   └── ... (altre 7 UDA)
├── secondo-biennio/
│   ├── index.html                 # Hub 3° e 4° anno (Matematica & Fisica)
│   ├── matematica/                # 4 UDA di Matematica (3.M1, 3.M2, 4.M1, 4.M2)
│   └── fisica/                    # 4 UDA di Fisica (3.F1, 3.F2, 4.F1, 4.F2)
├── quinto-anno/
│   ├── index.html                 # Hub 5° anno (Matematica & Fisica)
│   ├── matematica/                # 2 UDA di Matematica (5.M1, 5.M2)
│   └── fisica/                    # 2 UDA di Fisica (5.F1, 5.F2)
├── programmazione_matematica_fisica.html # Piano programmatico quinquennale interattivo
├── ringraziamenti.html            # Crediti pedagogici, dedica studenti e stack open source
├── index.html                     # Home page del portale web
└── README.md                      # Documentazione generale del progetto
```

### ⚠️ Regola dei Percorsi Relativi (Depth)
- **Pagine nella root** (`index.html`, `ringraziamenti.html`): profondità **0** → `shared/css/comode.css`.
- **Hub di Ciclo** (`primo-biennio/index.html`, `secondo-biennio/index.html`, `quinto-anno/index.html`): profondità **1** → `../shared/css/comode.css`.
- **UDA del Primo Biennio** (`primo-biennio/uda-X.X/`): profondità **2** → `../../shared/css/comode.css` e `../../shared/js/...`.
- **UDA del Secondo Biennio & Quinto Anno** (`secondo-biennio/matematica/uda-X.X/`): profondità **3** → `../../../shared/css/comode.css` e `../../../shared/js/...`.

---

## 2. Stack Tecnologico, Librerie Esterne & Web API Native

Per garantire **caricamenti istantanei su reti scolastiche**, **totale conformità GDPR** (zero cookie, zero database esterni) e **manutenibilità a lungo termine** senza step di compilazione, il progetto utilizza esclusivamente le seguenti tecnologie:

| Libreria / Standard | Versione / Specifica | Licenza | Risorsa / Modulo | Ruolo & Motivazione Ingegneristica |
| :--- | :--- | :--- | :--- | :--- |
| **KaTeX** | `v0.19.1` | MIT | CDN `jsDelivr` + `shared/js/components.js` | Rendering tipografico LaTeX sincrono e ultraveloce (~5× più rapido di MathJax, nessun reflow asincrono), ideale per frazioni ed espressioni su LIM e dispositivi mobili. |
| **Plus Jakarta Sans** | Variabile (`300..800`) | SIL OFL 1.1 | CDN `Google Fonts` | Font geometrico ad alta leggibilità per testi didattici, consegne e interfaccia inclusiva. |
| **JetBrains Mono** | Variabile (`400..700`) | SIL OFL 1.1 | CDN `Google Fonts` | Font monospazio con distinzione netta dei glifi algebrici (`1`/`l`/`I`, `0`/`O`, segni `+`/`−`) per input numerici, gettoni e badge XP. |
| **Web Audio API** | Standard W3C | Nativa Browser | `shared/js/audio.js` | Sintesi procedurale in tempo reale (onde sinusoidali/triangolari per click, chime di successo, errore morbido, hint e fanfara level-up) con **0 KB** di file `.mp3`. |
| **Web Speech API** | Standard W3C | Nativa Browser | `shared/js/speech.js` | Sintesi vocale `SpeechSynthesis` (`en-US` / `en-GB`) per la pronuncia madrelingua nei glossari CLIL senza chiamate a servizi cloud esterni. |
| **Web Storage API** | Standard W3C | Nativa Browser | `shared/js/gamification.js`, `theme.js` | Persistenza 100% locale su `localStorage` di punti XP, livelli, titoli UDA, tema chiaro/scuro e preferenza audio. |
| **SVG 2 Inline** | Standard W3C | Nativa Browser | Markup HTML/JS delle lezioni | Visualizzatori vettoriali interattivi nitidi a qualsiasi zoom (retta orientata in $\mathbb{Z}$, torte/barre frazionarie, diagrammi geometrici e fisici). |

### Inclusione Standard di KaTeX `0.19.1` nel `<head>`
```html
<!-- KaTeX 0.19.1 per rendering matematico -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.js" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/contrib/auto-render.min.js" crossorigin="anonymous"></script>
```

> [!CAUTION]
> **Regola Anti-Collisione CSS con KaTeX (Protezione Frazioni):**  
> Non definire **mai** nei blocchi `<style>` delle lezioni classi CSS con nomi usati internamente dal DOM di KaTeX:  
> `.frac-line`, `.mfrac`, `.vlist`, `.vlist-t`, `.vlist-r`, `.strut`, `.pstrut`, `.base`, `.mord`, `.mbin`, `.mrel`, `.mop`, `.msupsub`.  
> In passato una regola custom `.frac-line { height: 2px; margin: 4px 0; }` spostava la linea di frazione sopra il numeratore. `shared/css/theme.css` include ora uno **scudo globale** (`.katex .mfrac .frac-line`), ma usa sempre prefissi specifici per i componenti custom della lezione (es. `.cross-frac-divider`, `.lab-bar-line`).

---

## 3. Token di Design CSS (`shared/css/theme.css`)

Utilizza **esclusivamente** le variabili CSS del tema, evitando colori esadecimali hardcodati:

| Variabile CSS | Scopo / Significato | Valore Dark (Default) | Valore Light |
| :--- | :--- | :--- | :--- |
| `--bg-body` *(alias `--bg-canvas`)* | Sfondo principale pagina | `#090d16` | `#f8fafc` |
| `--bg-surface` | Sfondo card e contenitori | `#111827` | `#ffffff` |
| `--bg-surface-elevated` | Sfondo elementi interattivi / hover | `#1a2337` | `#f1f5f9` |
| `--bg-glass` *(alias `--bg-surface-glass`)* | Superficie semitrasparente navbar/toast | `rgba(17, 24, 39, 0.85)` | `rgba(255, 255, 255, 0.9)` |
| `--border-subtle` | Bordi di separazione e card | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` |
| `--border-accent` | Bordo evidenziato / focus attivo | `rgba(56, 189, 248, 0.25)` | `rgba(2, 132, 199, 0.25)` |
| `--text-main` | Testo primario ad alto contrasto | `#f1f5f9` | `#0f172a` |
| `--text-muted` | Testo secondario e descrizioni | `#94a3b8` | `#475569` |
| `--text-dim` | Etichette terziarie e metadati | `#64748b` | `#94a3b8` |
| `--accent-math` | Colore identitario Matematica | `#38bdf8` | `#0284c7` |
| `--accent-math-gradient` | Gradiente bottoni/barre Matematica | `linear-gradient(135deg, #0284c7, #6366f1)` | `linear-gradient(135deg, #0284c7, #4f46e5)` |
| `--accent-phys` *(alias `--accent-physics`)* | Colore identitario Fisica | `#f59e0b` | `#d97706` |
| `--accent-phys-gradient` | Gradiente bottoni/barre Fisica | `linear-gradient(135deg, #d97706, #e11d48)` | `linear-gradient(135deg, #d97706, #e11d48)` |
| `--accent-success` | Risposte corrette, completamento, assegno | `#10b981` | `#059669` |
| `--accent-warning` | Suggerimenti (*hints*), prerequisiti | `#f59e0b` | `#d97706` |
| `--accent-danger` | Risposte errate, reset | `#f43f5e` | `#e11d48` |
| `--accent-purple` | CLIL, Favole interattive, Metacognizione | `#8b5cf6` | `#7c3aed` |
| `--accent-gold` | Punti XP, trofei e titoli UDA | `#fbbf24` | `#d97706` |
| `--font-main` *(alias `--font-sans`)* | Famiglia tipografica principale | `'Plus Jakarta Sans', sans-serif` | *(invariato)* |
| `--font-mono` | Numeri, algebra, codice | `'JetBrains Mono', monospace` | *(invariato)* |

---

## 4. Catalogo Componenti HTML / CSS (`shared/css/components.css`)

### 4.1 Barra di Navigazione (`.navbar`) & Breadcrumbs (`.breadcrumbs`)
```html
<nav class="navbar">
  <a href="../../index.html" class="brand">📐 comode<span>.</span></a>
  <div class="nav-actions">
    <div class="gamification-widget" title="Il tuo livello e punti XP">
      <span class="level-badge user-level-val">Liv. 1 🌱</span>
      <span class="xp-counter user-xp-val">0 XP</span>
    </div>
    <button id="audioToggleBtn" class="icon-btn" aria-label="Audio">🔊 <span class="nav-text">Suoni</span></button>
    <button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Tema"><span id="themeIcon">☀️</span> <span id="themeLabel">Chiaro</span></button>
  </div>
</nav>

<div class="breadcrumbs">
  <a href="../../index.html">Home</a><span class="sep">/</span>
  <a href="../index.html">Primo Biennio</a><span class="sep">/</span>
  <a href="index.html">UDA 1.1: Insiemi, Logica e Algoritmi</a><span class="sep">/</span>
  <span class="current">Lezione 1.1</span>
</div>
```

### 4.2 Prerequisiti & Competenze in Uscita (`.prereq-objectives-grid`)
*Obbligatorio in ogni lezione, subito dopo la Hero Card:*
```html
<div class="prereq-objectives-grid">
  <div class="prereq-card">
    <div class="card-top-label prereq"><span>🔑</span> Prerequisiti Consigliati</div>
    <h2 class="po-title">Cosa ti serve prima di iniziare</h2>
    <ul class="po-list">
      <li><span class="po-icon">✓</span><div><strong>Concetto 1:</strong> Descrizione prerequisito.</div></li>
    </ul>
  </div>
  <div class="objectives-card">
    <div class="card-top-label objectives"><span>🎯</span> Competenze in Uscita</div>
    <h2 class="po-title">Cosa saprai fare alla fine della lezione</h2>
    <ul class="po-list">
      <li><span class="po-icon">🚀</span><div><strong>Competenza 1:</strong> Capacità pratica acquisita.</div></li>
    </ul>
  </div>
</div>
```

### 4.3 Scheda Teoria Flash con Ancore Univoche (`#teoria-1`, `#teoria-2`, ...)
Ogni card teorica **deve** avere un attributo `id` univoco (`teoria-1`, `teoria-2`, ecc.) affinché ogni esercizio possa puntare direttamente al riferimento teorico corrispondente:
```html
<section class="theory-wrapper">
  <div class="section-header">
    <h2 class="section-title"><span class="icon">⚡</span> Scheda Teoria Flash</h2>
    <button id="toggleTheoryBtn" class="collapse-btn"><span>Nascondi Teoria</span> ▴</button>
  </div>
  <div id="theoryContent" class="theory-grid">
    <div class="theory-card" id="teoria-1">
      <div class="theory-card-header">
        <span class="theory-num">1</span>
        <h3 class="theory-title">Proprietà Commutativa e Associativa</h3>
      </div>
      <div class="theory-body">
        <p>Sintesi operativa con formule KaTeX nitide come $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$.</p>
      </div>
    </div>
  </div>
</section>
```

### 4.4 Collegamento Esplicito Teoria ↔ Pratica (`.theory-link-box` e `.theory-ref-pill`)
> [!IMPORTANT]
> **Standard Didattico Obbligatorio:**  
> **Ogni esercizio proposto** (laboratorio guidato, sotto-sfida, esercizio di Palestra Mentale, flashcard e Scheda Operativa finale) deve esplicitare quale pezzo di teoria sta approfondendo, utilizzando `.theory-link-box` (nei laboratori e nella Scheda Operativa) o `.theory-ref-pill` (nelle card compatte e nelle flashcard) con `scrollToTheory('teoria-N')`.

```html
<!-- Box esteso per Laboratori e Schede Operative -->
<div class="theory-link-box">
  <span class="tl-icon">🔗</span>
  <div>
    <strong>Collegamento Teoria ↔ Pratica:</strong> Questo esercizio approfondisce
    <a href="#teoria-1" class="theory-link-anchor" onclick="event.preventDefault(); scrollToTheory('teoria-1');">Teoria 1 • Proprietà Commutativa e Associativa</a>,
    applicandole per riordinare e raggruppare mentalmente le coppie complementari a 100.
  </div>
</div>

<!-- Pillola compatta per singoli esercizi in griglia (es. Palestra Mentale) -->
<a href="#teoria-1" class="theory-ref-pill" onclick="event.preventDefault(); scrollToTheory('teoria-1');">
  🔗 Rif. Teoria 1 • Commutativa &amp; Associativa
</a>
```

### 4.5 Laboratorio Operativo con Hint e Verifica (`.lab-card`)
```html
<article class="lab-card" id="lab1">
  <div class="lab-badge-row">
    <span class="lab-tag">Laboratorio 1</span>
    <span class="lab-xp-badge">+10 XP</span>
  </div>
  <h3 class="lab-title">Titolo Problema</h3>

  <div class="theory-link-box">
    <span class="tl-icon">🔗</span>
    <div>
      <strong>Collegamento Teoria ↔ Pratica:</strong> Approfondisce
      <a href="#teoria-1" class="theory-link-anchor" onclick="event.preventDefault(); scrollToTheory('teoria-1');">Teoria 1 • Titolo Concetto</a>.
    </div>
  </div>

  <p class="lab-question">Descrizione del contesto applicativo.</p>

  <button type="button" class="hint-btn" onclick="toggleHint('hintLab1')">💡 Mostra Suggerimento</button>
  <div id="hintLab1" class="hint-text">Suggerimento euristico graduale...</div>

  <div class="verify-box">
    <input type="text" id="lab1Input" class="inline-input" placeholder="Tua risposta...">
    <button class="btn-action" onclick="verifyLab1()">Verifica Risposta</button>
    <span id="lab1Msg" class="feedback-msg" style="display: none;"></span>
  </div>
</article>
```

### 4.6 Compito di Realtà Finale — Scheda Operativa per Casa (`.homework-section`)
> [!IMPORTANT]
> **Obbligatorio in TUTTE le lezioni (curricolari e CLIL):**  
> Ogni lezione si conclude con un **Compito di Realtà finale strutturato come Scheda Operativa (Assegno per Casa)**. Gli studenti possono svolgerlo **da soli o lavorando in gruppo**, ma ciascuno deve **portare la scheda compilata per la lezione successiva**. Il componente include il pulsante `window.print()` supportato da regole `@media print` dedicate.

```html
<section class="homework-section" id="homeworkSection">
  <div class="section-header">
    <h2 class="section-title"><span class="icon">📋</span> Compito di Realtà Finale: Scheda Operativa (Assegno per Casa)</h2>
  </div>
  <article class="scheda-operativa-card">
    <div class="scheda-top-bar">
      <div class="scheda-badge-group">
        <span class="scheda-badge homework">🏠 Assegno per Casa</span>
        <span class="scheda-badge modality">👤 Individuale o 👥 In Gruppo</span>
      </div>
      <button type="button" class="btn-print-sheet" onclick="window.print()">🖨️ Stampa Scheda Operativa</button>
    </div>

    <h3 class="scheda-title">Scheda Operativa: «Titolo del Compito di Realtà»</h3>

    <div class="theory-link-box">
      <span class="tl-icon">🔗</span>
      <div>
        <strong>Collegamento Teoria ↔ Pratica:</strong> Integra
        <a href="#teoria-1" class="theory-link-anchor" onclick="event.preventDefault(); scrollToTheory('teoria-1');">Teoria 1 • Concetto Chiave</a>.
      </div>
    </div>

    <div class="scheda-delivery-callout">
      <strong>📅 Modalità di svolgimento e consegna:</strong> Puoi svolgere questo compito di realtà <strong>da solo</strong> oppure <strong>lavorando in gruppo</strong>, ma ciascuno studente deve <strong>portare la Scheda Operativa compilata per la lezione successiva</strong>.
    </div>

    <div class="scheda-student-fields">
      <div class="scheda-field-item"><span class="scheda-field-label">Studente / Studentessa:</span><div class="scheda-field-line"></div></div>
      <div class="scheda-field-item"><span class="scheda-field-label">Classe &amp; Data:</span><div class="scheda-field-line"></div></div>
      <div class="scheda-field-item"><span class="scheda-field-label">Modalità (Solo / Gruppo):</span><div class="scheda-field-line"></div></div>
    </div>

    <div class="scheda-problem-box">
      <strong>La Situazione-Problema:</strong> Testo del problema autentico e tracce operative numerate...
    </div>
  </article>
</section>
```

### 4.7 Promemoria Progettuali (`.memo-banner` e `.uda-memo-note`)
Per evidenziare promemoria editoriali o contenuti in arrivo nelle pagine Hub:
- `.memo-banner`: banner evidenziato full-width (usato in `index.html` per ricordare che ogni UDA avrà una **Favola Interattiva**).
- `.uda-memo-note.math` / `.uda-memo-note.phys`: box promemoria all'interno delle card UDA in sviluppo (es. `UDA 4.M1` Educazione finanziaria + Astronomia/Eclissi/Longitudine; `UDA 5.F1` Fac-simili bollette luce, acqua e gas).

---

## 5. API JavaScript Centralizzate

### 5.1 `window.ComodeComponents` (`shared/js/components.js`)
- `ComodeComponents.renderMath(target = document.body)`: Esegue KaTeX auto-render (`$$...$$`, `\[...\]`, `$...$`, `\(...\)`) sull'elemento indicato, attendendo automaticamente `window.load` se gli script `defer` di KaTeX non sono ancora pronti.
- `ComodeComponents.scrollToTheory(theoryId)` / `window.scrollToTheory(theoryId)`: Riapre automaticamente l'accordion della teoria se era chiuso, scorre dolcemente fino a `#theoryId` ed evidenzia la card/riga con `.theory-highlight`.
- `window.toggleHint(hintId)`: Mostra/nasconde `.hint-text` riproducendo il suono dedicato.

### 5.2 `window.ComodeFlashcards` (`shared/js/flashcards.js`)
Motore di autovalutazione basato su **Mastery Learning** con rimescolamento automatico Fisher-Yates delle opzioni ad ogni avvio e ad ogni `Ripeti Test` (con guardia anti-uniformità che impedisce a tutte le domande di avere la stessa lettera corretta):
```javascript
ComodeFlashcards.init('lessonFlashcardDeck', {
  deckId: 'pb-1.1-flashcards',
  xpPerCard: 15,
  completionXP: 25,
  cards: [
    {
      category: 'Frazioni & Decimali',
      theoryRef: 'Teoria 3 • Moltiplicare per 0,25 = 1/4',
      theoryTargetId: 'teoria-3',
      question: 'Qual è la strategia più comoda per calcolare $48 \\times 0,25$?',
      options: [
        'Moltiplicare in colonna per 25 e dividere per 100',
        'Scomporre 48 in fattori primi',
        'Trasformare $0,25 = \\frac{1}{4}$ e dividere $48 : 4 = 12$',
        'Approssimare per eccesso a $48 \\times 0,3$'
      ],
      correct: 2, // Varia sempre gli indici statici tra 0 (A), 1 (B), 2 (C), 3 (D)!
      explanation: 'Sostituire $0,25$ con $\\frac{1}{4}$ trasforma il prodotto nella metà della metà.'
    }
  ]
});
```

> [!IMPORTANT]
> **Due regole d'oro per le Flashcards:**
> 1. **Doppio backslash in JavaScript:** Nelle stringhe JS scrivi **sempre** `$\\frac{a}{b}$`, `$\\times$`, `$\\mathbb{Q}$`. Con un solo backslash `"\frac"` diventa il carattere ASCII *Form Feed* (`\f`) corrompendo la formula!
> 2. **Distribuzione delle risposte corrette:** Anche se `flashcards.js` rimescola dinamicamente le opzioni a runtime, nel codice sorgente distribuisci sempre `correct` in modo equilibrato tra `0`, `1`, `2` e `3` (mai tutte le carte con `correct: 1`!).

### 5.3 `window.ComodeAudio` (`shared/js/audio.js`)
- `playClick()`, `playSuccess()`, `playError()`, `playHint()`, `playLevelUp()`, `toggleMute()`.

### 5.4 `window.ComodeGamification` (`shared/js/gamification.js`)
- `addXP(amount, reason)`, `getXP()`, `getLevel()`, `markLessonCompleted(lessonId, xpReward)`, `isUDAUnlocked(udaId)`, `resetProgress()`.

### 5.5 `window.ComodeSpeech` (`shared/js/speech.js`) & `window.ComodeTheme` (`shared/js/theme.js`)
- `speakWord('cross simplification')` / `ComodeSpeech.speak(text, 'en-US')`.
- `ComodeTheme.toggle()` / `ComodeTheme.applyTheme('dark' | 'light')`.

---

## 6. Checklist di Qualità per Nuove UDA e Lezioni

Prima di pubblicare una nuova UDA o lezione, verifica tutti i punti seguenti:
1. [ ] **Struttura UDA completa:** La cartella dell'UDA prevede il proprio `index.html`, le lezioni curricolari, il modulo CLIL e **1 Favola Interattiva** dedicata all'UDA?
2. [ ] **Template & Percorsi:** Hai duplicato `shared/templates/lesson-template.html` verificando la profondità dei percorsi relativi (`../../` per Primo Biennio, `../../../` per Secondo Biennio e Quinto Anno)?
3. [ ] **KaTeX `0.19.1` & Protezione Frazioni:** Stai caricando KaTeX `0.19.1` e non hai usato nessuna classe CSS riservata (`.frac-line`, `.mfrac`, `.vlist`, `.strut`) negli stili custom?
4. [ ] **Prerequisiti & Competenze:** Sono presenti entrambe le card `.prereq-card` e `.objectives-card`?
5. [ ] **Collegamento Teoria ↔ Pratica ovunque:** Ogni card teorica ha un `id` (`teoria-1`, `teoria-2`, ...) e **ogni singolo esercizio, task, palestra mentale, flashcard e scheda operativa** mostra esplicitamente quale punto di teoria approfondisce?
6. [ ] **Flashcards equilibrate e con `\\frac`:** Le risposte corrette nel sorgente sono distribuite su lettere diverse (`0, 1, 2, 3`), ogni carta ha `theoryRef` + `theoryTargetId`, e tutte le formule LaTeX in JS usano il doppio backslash?
7. [ ] **Compito di Realtà Finale — Scheda Operativa per Casa:** La lezione termina con `<section class="homework-section">` stampabile, specificando che gli studenti possono lavorare da soli o in gruppo ma devono portare la scheda compilata per la lezione successiva?
8. [ ] **Zero `alert()` bloccanti:** Tutti i feedback agli studenti usano `.feedback-msg` inline e `ComodeAudio`?
