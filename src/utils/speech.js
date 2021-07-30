// preload for windows
// https://stackoverflow.com/questions/49506716/speechsynthesis-getvoices-returns-empty-array-on-windows
globalThis?.speechSynthesis?.getVoices();

function getVoiceByName(voices, name) {
  const voice = voices.find((voice) => name === voice.name);
  return voice;
}

function getVoiceByLang(voices, lang) {
  const voice = voices.find((voice) => lang === voice.formalLang);
  return voice;
}

function getVoice(lang) {
  const voices = globalThis?.speechSynthesis?.getVoices();

  switch (lang) {
    case "ja":
      return (
        getVoiceByName(voices, "Google 日本語") ||
        getVoiceByName(voices, "Microsoft Haruka Desktop - Japanese") ||
        getVoiceByLang(voices, lang)
      );
    default:
      return getVoiceByLang(voices, lang);
  }
}

export function speak({ msg, rate = 1, pitch = 1, volume = 1 }) {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.voice = getVoice(navigator.language);

    utterance.addEventListener("end", resolve);
    utterance.addEventListener("error", reject);

    speechSynthesis.speak(utterance);
  });
}
