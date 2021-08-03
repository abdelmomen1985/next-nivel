import { gql } from '@apollo/client';
import { LAYOUT_FRAGMENT } from './fragments/layout';
import { BOOKING_FRAGMENT } from './booking';

export const USER_FIELDS = `
id
name
email
ext_data
media
`;

export const NEW_USER = gql`
	mutation sign_up($name: String, $email: String, $password: String) {
		insert_visitors(
			objects: [{ name: $name, email: $email, passwired: $password }]
		) {
			affected_rows
		}
	}
`;

export const UPDATE_USER = gql`
mutation updateUserData
(
  $id: uuid!,
  $password: String,
  $email: String,
  ){
  update_visitors_by_pk(pk_columns: {id: $id},
   _set: 
  {
    id: $id,
    passwired: $password,
    email: $email
  }) {
    ${USER_FIELDS} 
  }
}
`;

export const UPDATE_USER_DATA = gql`
mutation updateUserData
(
  $id: uuid!,
  $ext_data: jsonb,
  $media: jsonb,
  $name: String
  ){
  update_visitors_by_pk(pk_columns: {id: $id},
   _set: 
  {
    id: $id,
    ext_data: $ext_data,
    media: $media,
    name: $name
  }) {
    ${USER_FIELDS}
  }
}
`;

export const GET_USER_BY_ID = gql`
  query visitors_by_pk($id: uuid! ){
    visitors_by_pk (id: $id) {
      ${USER_FIELDS}    
    }      
  }
`;

export const GET_USER_BOOKINGS_BY_USER_ID = gql`
	${LAYOUT_FRAGMENT}
	${BOOKING_FRAGMENT}
	query visitorBookings($visitor_id: uuid!) {
		bookings(where: { visitor_id: { _eq: $visitor_id } }) {
			...BookingFields
		}
		layout {
			...LayoutFragment
		}
	}
`;
