import { useQuery } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import LoadingCircle from '../../../components/common/LoadingCircle';
import { getRemoteSchemaUrl } from '../../../data/remoteSchemaUrl';
import Layout from '../../../Layouts/Layout';
import { GET_USER_BOOKINGS_BY_USER_ID } from '../../../query/user';
import { LayoutType } from '../../../types/layout';
import { getLocalizationProps } from './../../../context/LangContext';
// import { initializeApollo } from './../../../lib/apolloClient';
import { AppContext } from './../../../context/AppContext';
import ProfileHero from './../../../components/profile/ProfileHero';
import ProfileTabs from './../../../components/profile/ProfileTabs';
import AccountSettings from './../../../components/profile/ProfileTabs/AccountSettings';
import PersonalInfo from './../../../components/profile/ProfileTabs/PersonalInfo';
import { BookingType } from '../../../types/booking';
import UserBookings from './../../../components/profile/ProfileTabs/UserBookings';

const ProfilePage = ({ remoteSchemaUrl }: { remoteSchemaUrl: string }) => {
	const { user } = useContext(AppContext);
	const [currentTap, setCurrentTap] = useState<number>(1);
	const [layout, setLayout] = useState<LayoutType>({});
	const [bookings, setBookings] = useState<BookingType[]>([]);
	// const remoteSchemaUrl = await getRemoteSchemaUrl();
	const { data, loading } = useQuery(GET_USER_BOOKINGS_BY_USER_ID, {
		variables: {
			visitor_id: user?.id,
		},
		fetchPolicy: 'no-cache',

		onCompleted() {
			console.log(data);
			setBookings(data?.bookings);
			setLayout({ ...data?.layout, remoteSchemaUrl });
		},
		onError(err) {
			console.log(err);
		},
	});
	// useEffect(() => {}, [])
	return (
		<Layout layout={layout}>
			{loading && <LoadingCircle width="300px" margin="50px auto" />}
			{data && user && (
				<>
					<ProfileHero />
					<ProfileTabs currentTap={currentTap} setCurrentTap={setCurrentTap}>
						{currentTap === 1 && <AccountSettings />}
						{currentTap === 2 && (
							<UserBookings bookings={bookings} setBookings={setBookings} />
						)}
						{currentTap === 3 && <PersonalInfo />}
						{/* {currentTap === 3 && <AccountSettings />} */}
					</ProfileTabs>
				</>
			)}
		</Layout>
	);
};

export default ProfilePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const remoteSchemaUrl = await getRemoteSchemaUrl();
	// const resp = await client.query({ query: LOAD_ROOMS_BY_RATES });
	// console.log(resp?.data?.room_rates);
	return {
		props: {
			localization,
			remoteSchemaUrl,
			// layout: { ...resp?.data?.layout, remoteSchemaUrl },
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
