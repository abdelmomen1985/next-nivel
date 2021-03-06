import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CustomMD from '../common/CustomMD';
import useTranslation from './../../hooks/useTranslation';
import CustomModal from './../common/CustomModal/CustomModal';
import { useSpeech } from './../../hooks/useSpeech';

const ExpectSection = ({ home }: { home: any }) => {
	const { t, locale } = useTranslation();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const { speechHandler } = useSpeech();
	return (
		<>
			<section className="w-full px-5 text-center py-5 bg-secondary-light text-black flex justify-center items-center">
				<FontAwesomeIcon
					icon={faExclamationTriangle}
					className="text-primary-dark mx-2"
				/>
				<h3
					onMouseEnter={() => speechHandler(t('what2Expect'))}
					className="mx-2 font-semibold text-left"
				>
					{t('what2Expect')}
				</h3>
				<button
					onClick={() => setOpenModal(true)}
					onMouseEnter={() => speechHandler(t('readMore'))}
					className="bg-transparent underline text-primary-dark font-semibold mx-2 capitalize"
				>
					{t('readMore')}
				</button>
				<CustomModal
					show={openModal}
					onClose={() => setOpenModal(false)}
					closeWithin
					title={{
						ar: 'رسالة الفندق',
						en: 'Hotel Message',
					}}
					style={{
						top: '5rem',
						zIndex: '9999',
					}}
				>
					<div className="text-center my-3">
						<CustomMD
							options={{
								overrides: {
									h3: {
										props: { className: 'font-semibold my-4 text-lg' },
									},
									p: {
										props: { className: 'text-base font-normal my-3' },
									},
								},
							}}
							markdown={home[`covid_modal_${locale}`]}
						/>
					</div>
				</CustomModal>
			</section>
		</>
	);
};

export default ExpectSection;
