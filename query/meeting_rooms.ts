import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const MEETING_ROOMS = gql`
  ${LAYOUT_FRAGMENT}
  query meeting_rooms {
    meeting_rooms(order_by: { created_at: asc }) {
      guests
      id
      space
      title
    }
    layout {
      ...LayoutFragment
    }
  }
`;
