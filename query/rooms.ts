import { gql } from '@apollo/client'


export const LOAD_ROOMS = gql`
  query load_rooms{
    rooms{
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
    }
}
`