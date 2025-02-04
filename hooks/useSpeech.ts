import { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import useTranslation from './useTranslation'
export function useSpeech() {
  const { locale } = useTranslation()
  const { speak, voices, cancel } = useSpeechSynthesis()
  const arIndex =
    (voices as SpeechSynthesisVoice[])?.findIndex((item) =>
      item.lang.includes('ar'),
    ) || 1
  const enIndex =
    (voices as SpeechSynthesisVoice[])?.findIndex((item) =>
      item.lang.includes('en'),
    ) || 1

  const [currentVoiceIndex, setCurrentVoiceIndex] = useState<number>(() =>
    locale === 'ar' ? arIndex : enIndex,
  )

  useEffect(() => {
    if (locale === 'ar') {
      setCurrentVoiceIndex(arIndex)
    } else {
      setCurrentVoiceIndex(enIndex)
    }
  }, [locale, arIndex, enIndex])

  const speechHandler = (text: string) => {
    cancel()
    console.log('text', text)
    console.log('currentVoiceIndex', currentVoiceIndex)
    speak({ text, voice: voices[currentVoiceIndex] })

    var synth = window.speechSynthesis
    synth.cancel()
    var msg = new SpeechSynthesisUtterance()
    msg.lang = locale
    msg.text = text
    window.speechSynthesis.speak(msg)
  }
  return { speechHandler }
}
