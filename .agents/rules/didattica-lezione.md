# Standard di Progettazione Didattica e Architettura Lezioni COMODE

Questo documento definisce le linee guida non negoziabili per la creazione, l'aggiornamento e la revisione di qualsiasi lezione interattiva (file `.html`) del progetto **COMODE** (Liceo delle Scienze Umane).

Ogni volta che viene richiesta una nuova lezione o la modifica di una lezione esistente, **l'agente DEVE prendere come riferimento strutturale le lezioni già consolidate** (in particolare `quinto-anno/matematica/uda-5.m1-limiti-continuita-differenziale/lezione-02-calcolo-limiti-forme-indeterminate.html` e `lezione-03-continuita-singolarita-teoremi.html`) e rispettare rigorosamente le seguenti regole di consistenza.

---

## 1. Struttura Sequenziale Fissa di Ogni Pagina

Ogni file HTML di lezione deve presentare le sezioni esattamente nel seguente ordine:

1. **Header & Progress Bar:** 
   - Navbar superiore con tracciamento UDA, link alla programmazione, `progress-bar` dinamica e badge XP (`xp-pill`).
2. **Hero Card (Introduzione):**
   - Titolo della lezione, UDA di riferimento, tempo stimato (es. 50-60 min), prerequisiti essenziali e obiettivi di competenza.
3. **Laboratori Didattici Interattivi (`<article class="lab-card" id="lab1">` ... `id="lab6">`):**
   - 6 laboratori progressivi (dalla comprensione intuitiva alle regole formali).
   - **Regola dei Sotto-Esercizi:** Se un laboratorio è articolato in più parti (es. *Esercizio Concreto 3A* e *3B*), **OGNI singolo sotto-esercizio DEVE avere il proprio pulsante `Verifica Esercizio` immediato**, il proprio pulsante `💡 Mostra Suggerimento` e il proprio messaggio di feedback indipendente. Lo studente non deve mai essere costretto a completare l'intero laboratorio per sapere se la prima parte è corretta.
   - **Laboratorio 6 — Compito di Realtà Svolto in Classe:**
     - È **SEMPRE** dedicato a un caso reale applicato (es. Terzo Settore, economia sociale, dinamiche relazionali o fenomeni fisici/biologici).
     - Include un **simulatore grafico interattivo** (SVG o Canvas con slider e letture in tempo reale).
     - Include una sezione *«Risoluzione Guidata Passo-Passo per l'Esame»*.
     - Include un *Esercizio Concreto* numerico di consolidamento immediato.
4. **Palestra di Ripasso: Flashcards Attive (`<section class="flashcard-section" id="flashcardSection">`):**
   - **POSIZIONE TASSATIVA:** Si trova **SEMPRE PRIMA** del Compito di Realtà per Casa (`#homeworkSection`).
   - **UX A DOMANDA SINGOLA (One-Card-at-a-Time):** Utilizza **esclusivamente** il motore `ComodeFlashcards.init('lessonFlashcardDeck', ...)`.
   - **Comportamento:** Mostra una sola domanda per volta con 3 o 4 opzioni A/B/C/D rimescolate. Al click, evidenzia la risposta corretta, spiega il motivo con richiamo esplicito alla scheda teorica (`theoryRef`), assegna XP e abilita il passaggio alla carta successiva.
   - **DIVIETO:** Non presentare mai le flashcard tutte contemporaneamente in griglie statiche aperte nella stessa schermata.
5. **Scheda Operativa per Casa — Compito di Realtà (`<section class="homework-section" id="homeworkSection">`):**
   - **POSIZIONE TASSATIVA:** Si trova **SEMPRE DOPO** le flashcards e prima del riepilogo finale.
   - **REGOLA AUREA DELL'ISOMORFISMO:** Il compito per casa deve essere **SIMILE E ISOMORFO a quello svolto in classe (Laboratorio 6)**. Deve mantenere la stessa identica ambientazione (es. impresa sociale/cooperativa) e la stessa sequenza di quesiti logici, **cambiando unicamente la funzione matematica / i parametri numerici** su cui gli studenti lavorano.
   - **Caratteristiche richieste:**
     - Intestazione stampabile con campi studente (`Studente`, `Classe`, `Data`) e pulsante `🖨️ Stampa Scheda` (`window.print()`).
     - Numeri calibrati per produrre calcoli puliti e agevoli anche a mano.
     - Griglia di valutazione delle competenze (rubrica in decimi su 4 dimensioni: Calcolo analitico, Parametri di contesto, Interpretazione qualitativa, Relazione argomentativa).
6. **Quadro di Riepilogo Finale della Teoria (`<footer class="final-recap" id="finalRecap">`):**
   - Scheda di chiusura con tabella sinottica di definizioni, teoremi, regole operative e avvertenze didattiche.

---

## 2. Design System e Standard Tecnologici

* **Tema e Colori:** Dark theme coerente con variabili CSS universali (`--bg-surface`, `--bg-surface-elevated`, `--text-main`, `--text-muted`, `--accent-math`, `--accent-gold`, `--accent-purple`, `--border-subtle`).
* **Tipografia e Notazione:** Font moderni e formule renderizzate via **KaTeX** o **MathJax** con delimitatori standard `$...$` (inline) e `$$...$$` (blocco).
* **Script Condivisi Obbligatori:**
  ```html
  <script src="../../../shared/js/components.js"></script>
  <script src="../../../shared/js/flashcards.js"></script>
  <script src="../../../shared/js/comode.js"></script>
  ```
* **Gamification e Audio:** Integrazione con `ComodeProgress.completeLab(labNumber)` e feedback sonori con `ComodeAudio.play('success')` ed `error`.
* **Accessibilità e Inclusione:** Contrasto cromatico verificato, pulsanti `aria-label`, messaggi di feedback chiari per studenti BES/DSA.
