import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const LOCATION = gql`
  ${LAYOUT_FRAGMENT}
  query location {
    location {
      coordinates
      description_en
      description_ar
    }
    layout {
      ...LayoutFragment
    }
  }
`;

export const PRIVACY_PAGE_Q = gql`
  ${LAYOUT_FRAGMENT}
  query privacy {
    privacy {
      content_ar
      content_en
    }
    layout {
      ...LayoutFragment
    }
  }
`;
