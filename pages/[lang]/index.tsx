import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from '../../context/LangContext';
import Layout from '../../Layouts/Layout';
import HeroSection from '../../components/Home/HeroSection';
import StatsSection from '../../components/Home/StatsSection';
import TradeMarkSection from '../../components/Home/TradeMarkSection';
import AmenitiesSection from '../../components/Home/AmenitiesSection';
import RoomsNdSuits from '../../components/Home/RoomsNdSuits';
import Dining from '../../components/Home/Dining';
import MeetingsNdEvents from '../../components/Home/MeetingsNdEvents';
import ExpectSection from './../../components/Home/ExpectSection';

const HomePage = () => (
	<Layout title="Home Page">
		<ExpectSection />
		<HeroSection />
		<StatsSection />
		<TradeMarkSection />
		<AmenitiesSection />
		<RoomsNdSuits />
		<Dining />
		<MeetingsNdEvents />
	</Layout>
);

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
export default HomePage;
