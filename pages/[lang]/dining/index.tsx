import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useContext, useState } from 'react';
import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';
import { daysInWeek } from '../../../utils/daysInWeek';
import styles from './dining.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import { AppContext } from './../../../context/AppContext';
const resturantsData = [
	{
		image: '/images/restuarnts/1.jpg',
		title: {
			ar: 'كافيه الفلك',
			en: 'Alfalak Cafe',
		},
		description: {
			ar:
				'استرخ بعد الوصول أو استعد نشاطك قبل المغادرة مع الوجبات الخفيفة والمشروبات في أجواء ودية واجتماعية في مقهى الفلك. يقع المقهى في طابق الردهة ، ويمكن استخدامه كمنطقة اجتماعات غير رسمية للمجموعات والأفراد.',
			en:
				'Relax after arrival or energize before the departure with light snacks and drinks in the friendly and social atmosphere of the Alfalak Café. Located on the lobby level, the café can be used as the informal meeting area for groups and individuals.',
		},
		workingHrs: [
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
			'6:00 am - 12:00 am',
		],
	},
	{
		image: '/images/restuarnts/2.jpg',
		title: {
			en: 'Alkawkab Cafe',
			ar: 'كافيه الكوكب',
		},
		description: {
			ar:
				' جرب أجواء المقاهي الراقية في بهو الفندق. اختر من بين مجموعة من المشروبات عالية الجودة والوجبات الخفيفة. جرب قائمتنا الانتقائية ، التي تُقدم طوال اليوم ووجبات البوفيه في رمضان والحج.',
			en:
				'Experience the high-end street coffee shop atmosphere at our lobby. Choose from a range of quality beverages and light snacks. Try our a la carte menu, served all day and buffet meals in Ramadan and Hajj.',
		},
		workingHrs: [
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
		],
	},
	{
		image: '/images/restuarnts/3.jpg',
		title: {
			ar: 'كافيه الخليل',
			en: 'Alkhalil Cafe',
		},
		description: {
			ar:
				'استرخ على الأريكة المريحة أثناء الاستمتاع بالوجبات الخفيفة من قائمة الطعام والمشروبات التي تختارها. المقهى يقع على مستوى الشارع ويرحب بالفندق والنزلاء الخارجيين.',
			en:
				'Relax on the comfortable sofa while enjoying light snacks from our a la carte menu and beverage of your choice. The café is situated at the street level and welcomes hotel and outside guests.',
		},
		workingHrs: [
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
			'7:00 am - 12:00 am',
		],
	},
	{
		image: '/images/restuarnts/4.jpg',
		title: {
			ar: 'مطعم الأورشيد',
			en: 'Alorchid Restaurant',
		},
		description: {
			ar:
				'انغمس في كرم الضيافة أثناء الاستمتاع بالمأكولات الآسيوية التقليدية الأصيلة. نحن فخورون بأن نقدم لضيوفنا أوسع مجموعة من خيارات الطهي ، بما في ذلك Noodle Corner و Asian Grill والأطباق اليابانية والمالايا ومحطات الطهي المباشر ومجموعة متنوعة من العصائر الطازجة. يقدم المطعم بوفيه إفطار وقائمة مأكولات انتقائية للغداء والعشاء.',
			en:
				'Soak in superb hospitality while enjoying traditional Asian authentic cuisine. We are proud to offer our guests the widest range of culinary options, including Noodle Corner, Asian Grill, Japanese and Malaya dishes, live cooking stations and various fresh juice selections. The restaurant serves breakfast buffet and a la carte for lunch and dinner.',
		},
		workingHrs: [
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
			'6:00 am - 11:00 am',
		],
	},
	{
		image: '/images/restuarnts/5.jpg',
		title: {
			ar: 'مطعم القنديل',
			en: 'Alqandeel Restaurant',
		},
		description: {
			ar:
				'استمتع بالتصميم المعاصر والمطبخ الأكثر حداثة في مطعمنا لتناول الطعام طوال اليوم. يقع المطعم في طابق الميزانين ويتسع لـ 302 ضيفًا ، ويقدم تجربة أطعمة ومشروبات متنوعة ، جنبًا إلى جنب مع وجبات البوفيه ومحطات الطهي الحية.',
			en:
				'Enjoy contemporary design and a state-of-art kitchen in our all day dining restaurant. Located on the mezzanine level with seating capacity for 302 guests, the restaurant offers a diversified food and beverage experience, along with buffet meals and live cooking stations.',
		},
		workingHrs: [
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
			'6:00 am - 11:30 am',
		],
	},
];
const DiningPage = () => {
	const { isMobile } = useContext(AppContext);
	const { t, locale } = useTranslation();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [restDetails, setRestDetails] = useState<any>(undefined);
	return (
		<Layout>
			<img src="/images/restaurant.png" className="w-full h-full" />
			<h3 className="my-5 py-5 mx-auto text-center text-black text-3xl font-bold">
				{t('diningNdDrinks')}
			</h3>
			<hr className="w-full my-10" />
			{resturantsData.map((resturant, i) => (
				<div className={styles.resturantContainer}>
					<div key={i} className={styles.resturant}>
						<img src={resturant?.image} className="w-full" />
						<div className="mx-5 md:mx-10">
							<h3 className="text-black text-2xl font-semibold my-2">
								{resturant?.title[locale]}
							</h3>
							<p className="text-black text-base font-normal my-2">
								{resturant?.description[locale]}
							</p>
							<button
								onClick={() => {
									setRestDetails(resturant);
									setOpenModal(true);
								}}
								className="btn-primary-light text-white px-10 py-5 rounded-sm block my-3 text-lg font-semibold"
							>
								{t('details')}
							</button>
						</div>
					</div>
				</div>
			))}

			<CustomModal
				closeWithin={true}
				wrapperStyle={{ zIndex: '9999' }}
				style={{
					width: '80%',
					overflowY: 'auto',
					maxHeight: '100%',
					top: isMobile ? 0 : '2rem',
					zIndex: '9999',
				}}
				title={restDetails?.title}
				show={openModal && restDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setRestDetails(undefined);
				}}
			>
				<div className="w-full my-3 flex justify-center items-center px-5 mx-3">
					<img src={restDetails?.image} className="w-2/4 h-4/5" />
					<div className="mx-10 flex justify-between items-start">
						<div>
							{daysInWeek.map((day: string, i: number) => (
								<h5 className="text-base font-normal m-2 capitalize" key={i}>
									{day}
								</h5>
							))}
						</div>
						<div>
							{restDetails?.workingHrs.map((hour: string, index: number) => (
								<h5 className="text-base font-normal m-2" key={index}>
									{hour}
								</h5>
							))}
						</div>
					</div>
				</div>
			</CustomModal>
		</Layout>
	);
};

export default DiningPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	return {
		props: {
			localization,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
