/**
 * comode — speech.js
 * Sintesi vocale nativa per lezioni CLIL (Web Speech API).
 * Permette di ascoltare la pronuncia inglese madrelingua dei termini scientifici con un clic.
 * Zero dipendenze esterne, zero file audio da scaricare.
 */

class ComodeSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    if (this.synth) {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
        };
      }
    }
  }

  speak(text, lang = 'en-US') {
    if (!this.synth) {
      console.warn('Sintesi vocale non supportata da questo browser.');
      return;
    }

    try {
      this.synth.cancel(); // Interrompe eventuali letture precedenti
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.88; // Ritmo leggermente calibrato per studenti

      if (this.voices.length === 0) {
        this.voices = this.synth.getVoices();
      }

      // Seleziona preferibilmente una voce con lingua corrispondente
      const voice = this.voices.find(v => v.lang === lang || v.lang.startsWith(lang.slice(0, 2)));
      if (voice) utterance.voice = voice;

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Errore sintesi vocale:', e);
    }
  }
}

window.ComodeSpeech = new ComodeSpeech();

// Helper globale richiamabile direttamente nei bottoni HTML:
// onclick="speakWord('common denominator')"
window.speakWord = function(text, lang = 'en-US') {
  if (window.ComodeSpeech) {
    window.ComodeSpeech.speak(text, lang);
  }
};
