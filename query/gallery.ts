import { gql } from "@apollo/client";
import { LAYOUT_FRAGMENT } from "./fragments/layout";

const GALLERY_FRAGMENT = gql`
  fragment GalleryFragment on gallery {
    id
    media
    title
    description
    sorter
  }
`;

export const LOAD_GALLERY = gql`
  ${GALLERY_FRAGMENT}
  ${LAYOUT_FRAGMENT}

  query GalleryPage {
    gallery {
      ...GalleryFragment
    }
    layout {
      ...LayoutFragment
    }
  }
`;
