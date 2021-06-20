import { gql } from '@apollo/client';

export const LOAD_GALLERY = gql`
  query gallery {
    gallery{
      id
      media
      title
      description
    }
  }
`