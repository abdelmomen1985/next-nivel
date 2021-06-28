import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import { getLocalizationProps } from '../../../context/LangContext';
import Layout from '../../../Layouts/Layout';
import { LayoutType } from '../../../types/layout';
import { initializeApollo } from './../../../lib/apolloClient';
import { LOCATION } from './../../../query/location';
import Location from '../../../components/location/Location';
import { getRemoteSchemaUrl } from '../../../data/remoteSchemaUrl';
import Markdown from 'markdown-to-jsx';
import useTranslation from './../../../hooks/useTranslation';
import styles from './location.module.scss';
const LocationPage = ({
	location,
	layout,
}: {
	location: any;
	layout: LayoutType;
}) => {
	const { t, locale } = useTranslation();
	return (
		<Layout layout={layout}>
			<Location coordinates={location.coordinates} />
			<div className="mx-auto md:mx-5 my-4 text-center">
				<Markdown
					options={{
						overrides: {
							p: {
								props: {
									className: 'text-base md:text-lg text-center mx-5 my-4 px-5',
								},
							},
							ul: {
								props: {
									className: styles.locationDataList,
								},
							},
						},
					}}
				>
					{location[`description_${locale}`]}
				</Markdown>
			</div>
		</Layout>
	);
};

export default LocationPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const remoteSchemaUrl = await getRemoteSchemaUrl();
	const client = initializeApollo();
	const resp = await client.query({ query: LOCATION });
	console.log(resp?.data);
	return {
		props: {
			localization,
			location: resp?.data?.location,
			layout: { ...resp?.data?.layout, remoteSchemaUrl },
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
