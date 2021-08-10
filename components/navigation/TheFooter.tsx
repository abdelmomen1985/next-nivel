import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_SOCIAL_MEDIA } from '../../query/socialMedia';
import useTranslation from '../../hooks/useTranslation';
import { LayoutType } from '../../types/layout';
import styles from './navigation.module.scss';
const TheFooter = ({ layout }: { layout: LayoutType }) => {
	const { locale, t } = useTranslation();
	const [socialMediaLinks, setSocialMediaLinks] = useState<any>([]);
	const { data, loading } = useQuery(GET_SOCIAL_MEDIA, {
		onCompleted() {
			setSocialMediaLinks([...data.socialMediaLinks]);
		},
	});

	return (
		<footer className="w-full bg-gray-light px-5 py-10 mt-12 mb-0">
			<div className="flex justify-center">
				<img
					src={layout?.remoteSchemaUrl + layout?.footer_logo_en?.url}
					style={{ maxWidth: '200px' }}
					className="m-1"
				/>
			</div>
			<div className="mx-5 my-5 grid grid-col-1 md:grid-cols-3 gap-3 items-start">
				<div>
					<p
						className={clsx(
							locale == 'ar' ? 'text-right' : 'text-left',
							'text-primary-dark my-4 md:my-0 text-base font-normal'
						)}
					>
						{layout[`footer_description_${locale}`]}
					</p>
				</div>
				<div className="mx-2 md:mx-2">
					<h3 className="text-primary-dark text-xl font-semibold capitalize">
						important links
					</h3>

					<Link href="/about">
						<a className="text-gray-dark text-lg font-medium block my-3">
							About
						</a>
					</Link>
					<Link href="/contact">
						<a className="text-gray-dark text-lg font-medium block my-3">
							Contact Us
						</a>
					</Link>
					<Link href="/events">
						<a className="text-gray-dark text-lg font-medium block my-3">
							Events
						</a>
					</Link>
					<Link href="/location">
						<a className="text-gray-dark text-lg font-medium block my-3">
							Our Location
						</a>
					</Link>
				</div>
				<div className="ml-0 md:ml-6">
					<h3 className="text-primary-dark text-xl font-semibold capitalize">
						{t('ourSocialMedia')}
					</h3>
					{socialMediaLinks.length > 0 &&
						socialMediaLinks.map((mediaLink: any) => (
							<a className={styles.socialMediaLink}>
								<Image
									src={layout?.remoteSchemaUrl + mediaLink?.icon?.url}
									width={mediaLink?.icon?.width}
									height={mediaLink?.icon?.height}
								/>
								<span className="p-2">{mediaLink[`name_${locale}`]}</span>
							</a>
						))}
				</div>
			</div>
		</footer>
	);
};

export default TheFooter;
