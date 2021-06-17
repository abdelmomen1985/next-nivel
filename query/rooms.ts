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
  $type: jsonb
   ) {
    rooms_aggregate(where:
    {
      accessibility: {_eq: $accessibility},
      room_type: {_contains: $type}
    }) {
    nodes {
      ${ROOM_FIELDS}
    }
  }
  }
`