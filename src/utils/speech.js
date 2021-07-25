const synth = window.speechSynthesis;

export function speak({ msg, rate = 1, pitch = 1, volume = 1 }) {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.addEventListener("end", resolve);
    utterance.addEventListener("error", reject);

    synth.speak(utterance);
  });
}
