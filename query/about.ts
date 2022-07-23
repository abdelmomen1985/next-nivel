import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const LOAD_ABOUT_LAYOUT = gql`
  ${LAYOUT_FRAGMENT}
  query aboutLayout {
    layout {
      ...LayoutFragment
    }
  }
`;
