import useTranslation from "./useTranslation";

export function useSpeech() {
  const { locale } = useTranslation();
  /*
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState<number>(() =>
    locale === "ar" ? 1 : 0
  );
  useEffect(() => {
    if (locale === "ar") {
      setCurrentVoiceIndex(1);
    } else {
      setCurrentVoiceIndex(3);
    }
  }, [locale]);
  */
  const speechHandler = (text: string) => {
    /*
    cancel();
    console.log("text", text);
    console.log("currentVoiceIndex", currentVoiceIndex);
    speak({ text, voice: voices[currentVoiceIndex] });
    */
    var synth = window.speechSynthesis;
    synth.cancel();
    var msg = new SpeechSynthesisUtterance();
    msg.lang = locale;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  return { speechHandler };
}
