import { gql } from '@apollo/client'
import { LAYOUT_FRAGMENT } from './fragments/layout';
import { AMENITIES_FRAGMENT } from './fragments/amenities';
export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFragment on Restaurants {
  description_ar
  description_en
  id
  name
  working_hrs_ar
  working_hrs_en
  media {
    url
    width
    height
  }
}
`


export const LOAD_RESTAURANTS = gql`
  ${RESTAURANT_FRAGMENT}
  ${LAYOUT_FRAGMENT}
  ${AMENITIES_FRAGMENT}
  query Restaurants {
    restaurants{
    ...RestaurantFragment
    } 
    layout {
      ...LayoutFragment
    }
    
  }

`