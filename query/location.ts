import { gql } from '@apollo/client';
import { LAYOUT_FRAGMENT } from './fragments/layout';

export const LOCATION = gql`
	${LAYOUT_FRAGMENT}
	query location {
		location {
			coordinates
			description_en
			description_ar
		}
		layout {
			...LayoutFragment
		}
	}
`;
