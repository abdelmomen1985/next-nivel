import { gql } from '@apollo/client';

export const USER_FIELDS = `
id
name
username
email
ext_data
media
`;

export const NEW_USER = gql`
	mutation sign_up($name: String, $username: String, $password: String) {
		insert_users(
			objects: [{ name: $name, username: $username, passwired: $password }]
		) {
			affected_rows
		}
	}
`;

export const UPDATE_USER = gql`
mutation updateUserData
(
  $id: uuid!,
  $username: String,
  $password: String,
  $name: String
  ){
  update_visitors_by_pk(pk_columns: {id: $id},
   _set: 
  {
    id: $id,
    username:$username,
    passwired: $password,
    name: $name
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
