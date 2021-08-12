import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const LOAD_PROFILE_LAYOUT = gql`
  ${LAYOUT_FRAGMENT}
  query profilLayout {
    layout {
      ...LayoutFragment
    }
  }
`;
