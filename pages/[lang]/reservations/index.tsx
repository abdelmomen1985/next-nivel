import { useState } from 'react';
import { LayoutType } from '../../../types/layout';
import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';
import { getRemoteSchemaUrl } from '../../../data/remoteSchemaUrl';
import { initializeApollo } from '../../../lib/apolloClient';
import { LOAD_RESTAURANTS } from '../../../query/restaurants';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useTranslation from './../../../hooks/useTranslation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const EditStay = () => {
	const { locale } = useTranslation();
	const router = useRouter();
	const { register, errors, handleSubmit } = useForm({
		mode: 'onTouched',
	});
	const editStayHandler = (data: any) => {
		console.log(data);
		router.push({
			pathname: `/${locale}/booking`,
			query: { res_code: data?.res_code },
		});
	};

	return (
		<form
			className="flex justify-center items-center my-4 mx-auto"
			onSubmit={handleSubmit(editStayHandler)}
		>
			<input
				placeholder="Enter your reservation code"
				className={clsx('rounded px-2 py-1 ')}
				style={{
					border: errors?.res_code ? '1px solid red' : 'none',
				}}
				name="res_code"
				ref={register({
					required: true,
				})}
			/>
			<button className="rounded px-2 py-1  bg-primary-light text-white">
				Edit
			</button>
		</form>
	);
};
const ReservationsPage = ({ layout }: { layout: LayoutType }) => {
	const { locale } = useTranslation();
	const [editStay, setEditStay] = useState<boolean>(false);

	return (
		<Layout layout={layout}>
			<div className="flex flex-col justify-center items-center my-28 h-60">
				<button className="" onClick={() => setEditStay(true)}>
					Edit Stay
				</button>
				{editStay && <EditStay />}
			</div>
		</Layout>
	);
};

export default ReservationsPage;

export const getAnyProps = async (ctx: any) => {
	const localization = getLocalizationProps(ctx, 'common');
	const remoteSchemaUrl = await getRemoteSchemaUrl();
	const client = initializeApollo();
	const resp = await client.query({ query: LOAD_RESTAURANTS });
	console.log('reservations');
	return {
		props: {
			localization,
			layout: { ...resp?.data?.layout, remoteSchemaUrl },
		},
	};
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return await getAnyProps(ctx);
};
