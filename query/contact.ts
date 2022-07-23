import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const LOAD_CONTACT_LAYOUT = gql`
  ${LAYOUT_FRAGMENT}
  query contactLayout {
    layout {
      ...LayoutFragment
    }
  }
`;
