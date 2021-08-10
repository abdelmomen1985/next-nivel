import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react';
import useTranslation from './useTranslation';

export function useSpeech() {
	const { locale } = useTranslation();

	const { speak, voices } = useSpeechSynthesis();
	const [currentVoiceIndex, setCurrentVoiceIndex] = useState<number>(() =>
		locale === 'ar' ? 1 : 0
	);
	useEffect(() => {
		if (locale === 'ar') {
			setCurrentVoiceIndex(1);
		} else {
			setCurrentVoiceIndex(3);
		}
	}, [locale]);

	const speechHandler = (text: string) => {
		console.log('text', text);
		// speak({ text, voice: voices[currentVoiceIndex] });
	};
	return { speechHandler };
}
