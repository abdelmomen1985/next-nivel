import React from 'react';
import useTranslation from './../../hooks/useTranslation';

const ChildAlert = () => {
	const { t, locale } = useTranslation();
	return (
		<div className="w-full mx-auto my-5 px-5 py-5 bg-primary-light text-primary-dark text-lg font-semibold">
			{t('childAlert')}
		</div>
	);
};

export default ChildAlert;
