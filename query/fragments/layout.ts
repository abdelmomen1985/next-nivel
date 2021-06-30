import { gql } from "@apollo/client";

export const LAYOUT_FRAGMENT = gql`
  fragment LayoutFragment on Layout {
    top_logo_en {
      url
      height
      width
    }
    top_logo_ar {
      url
      height
      width
    }
    footer_logo_en {
      url
      height
      width
    }
    footer_logo_ar {
      url
      height
      width
    }
    footer_description_en
    footer_description_ar
  }
`;
