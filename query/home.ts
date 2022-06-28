import { gql } from "@apollo/client";
import { AMENITIES_FRAGMENT } from "./fragments/amenities";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

export const HOME_SECTIONS_FRAGMENT = gql`
  fragment HomeSectionsFragment on HomeSections {
    id
    media {
      url
      width
      height
    }
    name
    description_ar
    description_en
  }
`;
export const HOME_FRAGMENT = gql`
  fragment HomeFragment on Homepage {
    id
    covid_modal_ar
    covid_modal_en
    description_ar
    description_en
    address_ar
    address_en
    created_at
    published_at
  }
`;
export const HOME_PAGE = gql`
  ${HOME_FRAGMENT}
  ${LAYOUT_FRAGMENT}
  ${AMENITIES_FRAGMENT}
  ${HOME_SECTIONS_FRAGMENT}
  query Homepage {
    homepage {
      ...HomeFragment
      home_sections {
        ...HomeSectionsFragment
      }
    }
    layout {
      ...LayoutFragment
    }
    amenities(where: { hotel_amenity: true }) {
      ...AmenityFragment
    }
    strpRooms(publicationState: LIVE) {
      id
      name
      sorter
      images {
        url
      }
    }
  }
`;
