const output = document.getElementById("output");
const btn = document.getElementById("startStopBtn");

let isListening = false;
let recognition;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    output.textContent = transcript;
  };

  recognition.onend = () => {
    if (isListening) recognition.start(); // auto-restart if still listening
  };

} else {
  alert("Sorry, your browser doesn't support Speech Recognition.");
}

btn.addEventListener("click", () => {
  if (!isListening) {
    recognition.start();
    btn.textContent = "Stop Listening";
    isListening = true;
  } else {
    recognition.stop();
    btn.textContent = "Start Listening";
    isListening = false;
  }
});
