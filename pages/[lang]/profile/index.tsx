import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../../Layouts/Layout';
import { LayoutType } from '../../../types/layout';
import { getLocalizationProps } from './../../../context/LangContext';

const ProfilePage = () => {
	return (
		<Layout layout={{} as LayoutType}>
			<h3>Profile page</h3>
		</Layout>
	);
};

export default ProfilePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	// const remoteSchemaUrl = await getRemoteSchemaUrl();
	// const client = initializeApollo();
	// const resp = await client.query({ query: LOAD_ROOMS_BY_RATES });
	// console.log(resp?.data?.room_rates);
	return {
		props: {
			localization,
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
