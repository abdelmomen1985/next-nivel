import { gql } from '@apollo/client';

export const GET_SOCIAL_MEDIA = gql`
	query socialMediaLinks {
		socialMediaLinks {
			icon {
				alternativeText
				url
				height
				width
			}
			id
			name_ar
			name_en
			url
			published_at
			updated_at
		}
	}
`;
