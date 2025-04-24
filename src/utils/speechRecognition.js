let recognition = null;
let isListening = false;

export function initSpeechRecognition({ onResult, onEnd }) {
  if (recognition) return recognition;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) throw new Error('Speech Recognition not supported.');
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (e) => onResult(e.results[0][0].transcript);
  recognition.onend = () => {
    isListening = false;
    onEnd();
  };
  return recognition;
}

export function startListening(callbacks) {
  if (isListening) return;
  const recog = initSpeechRecognition(callbacks);
  recog.start();
  isListening = true;
}

export function stopListening() {
  if (!isListening || !recognition) return;
  recognition.stop();
}
