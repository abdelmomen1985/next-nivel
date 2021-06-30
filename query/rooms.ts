import { gql } from '@apollo/client';
import { AMENITIES_FRAGMENT } from './fragments/amenities';
import { LAYOUT_FRAGMENT } from './fragments/layout';

export const ROOM_FIELDS = `
      id
      media
      title
      room_rates{
        id
        base_price 
        rate{
          id
          title
          description
        }
      }
`;
export const Room4RatesFields = `
				id
				name
				images {
					url
					width
					height
				}
				slug
				accessibility
				area
				description_ar
				description_en
`;
export const RateFields = `
		base_price
			id
			rate {
				description
				title
		}
`;
export const LOAD_ROOMS_BY_RATES = gql`
  ${LAYOUT_FRAGMENT}
	query roomRates {
		room_rates(where: { is_base_pkg: { _eq: true } }) {
			${RateFields}
			RelWithStrapiRoom {
				${Room4RatesFields}
			}
		}
		layout{
      ...LayoutFragment
    }
	}
`;

export const LOAD_ROOM_RATES = gql`
	query roomRates($room_id: Int!) {
  	room_rates(where: {strp_room_id: {_eq: $room_id}, is_base_pkg: {_eq: false}}) {
			${RateFields}
		}
	}
`;
export const LOAD_ROOMS = gql`
  ${LAYOUT_FRAGMENT}
  query load_rooms{
    rooms{
      ${ROOM_FIELDS}
    }
    layout{
      ...LayoutFragment
    }
}
`;

export const ROOMS_AGGREGATE = gql`
  query rooms_agg(
  $accessibility: Boolean, 
  $type: String
   ) {
    rooms_aggregate(where: {room_type: {_contains: {type: $type}}, accessibility: {_eq: $accessibility}}) {
    nodes {
      ${ROOM_FIELDS}
    }
  }
  }
`;

export const ROOM_AMENITIES = gql`
	${AMENITIES_FRAGMENT}
	query roomAmenities($room_id: JSON!) {
		roomAmenities(where: { room: { id: $room_id } }) {
			count
			unit
			amenitiy {
				...AmenityFragment
			}
		}
	}
`;
