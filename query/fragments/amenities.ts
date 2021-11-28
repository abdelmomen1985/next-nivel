import { gql } from "@apollo/client";

export const AMENITIES_FRAGMENT = gql`
  fragment AmenityFragment on Amenities {
    description_ar
    description_en
    id
    media {
      url
      width
      height
    }
    name
    unit
    label_first
  }
`;
