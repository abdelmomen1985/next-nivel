import React from 'react';
import useTranslation from './../../hooks/useTranslation';
import { useSpeech } from './../../hooks/useSpeech';

const ChildAlert = () => {
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();
	return (
		<div
			onMouseEnter={() => speechHandler(t('childAlert'))}
			className="w-full mx-auto my-5 px-5 py-5 bg-primary-light text-primary-dark text-lg font-semibold"
		>
			{t('childAlert')}
		</div>
	);
};

export default ChildAlert;
