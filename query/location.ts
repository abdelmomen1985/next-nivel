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
      title_en
      title_ar
      content_ar
      content_en
    }
    layout {
      ...LayoutFragment
    }
  }
`;

export const ABOUT_PAGE_Q = gql`
  ${LAYOUT_FRAGMENT}
  query about {
    about {
      title_en
      title_ar
      content_ar
      content_en
    }
    layout {
      ...LayoutFragment
    }
  }
`;

export const CONTACT_PAGE_Q = gql`
  ${LAYOUT_FRAGMENT}
  query career {
    career {
      info_email
      career_email
      phone
      content_ar
      content_en
    }
    layout {
      ...LayoutFragment
    }
  }
`;
