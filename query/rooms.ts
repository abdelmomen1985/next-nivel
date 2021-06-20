import { gql } from '@apollo/client'

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
`
export const LOAD_ROOMS = gql`
  query load_rooms{
    rooms{
      ${ROOM_FIELDS}
    }
}
`

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
`