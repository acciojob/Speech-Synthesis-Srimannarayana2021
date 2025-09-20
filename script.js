// Your script here.
const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Set the initial text for the speech utterance
  msg.text = document.querySelector('[name="text"]').value;

  /**
   * Populates the dropdown menu with available voices.
   */
  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en')) // Optional: Filter for English voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  /**
   * Sets the selected voice for the speech utterance and restarts speech.
   */
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    // Restart speech to apply the new voice immediately
    toggle();
  }

  /**
   * Toggles speech synthesis on and off.
   * @param {boolean} startOver - If true, cancels current speech and starts over. Defaults to true.
   */
  function toggle(startOver = true) {
    speechSynthesis.cancel(); // Stop any currently speaking utterance
    if (startOver) {
      speechSynthesis.speak(msg); // Start speaking the utterance
    }
  }

  /**
   * Sets a property (rate, pitch, or text) on the speech utterance
   * and restarts the speech to apply the change.
   */
  function setOption() {
    // The 'name' of the input element matches the property on the 'msg' object
    msg[this.name] = this.value;
    // Restart speech to apply the new setting
    toggle();
  }

  // Event Listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  // Using an arrow function to pass 'false' to toggle, which only stops speech
  stopButton.addEventListener('click', () => toggle(false));