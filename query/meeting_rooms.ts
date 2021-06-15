import { gql } from '@apollo/client';


export const MEETING_ROOMS = gql`
  query meeting_rooms {
    meeting_rooms(order_by: {created_at: asc}) {
    guests
    id
    space
    title
   }
  }
`