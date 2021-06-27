import { gql } from "@apollo/client";

export const HOME = gql`
  query home {
    logo {
      footer_en {
        url
        width
        height
      }
      top_nav_en {
        url
        width
        height
      }
    }
  }
`;
