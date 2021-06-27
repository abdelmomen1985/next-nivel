import { MediaType } from './media';

export type RestaurantType = {
  name: {
    ar: string;
    en: string;
  };
  description_en?: string;
  description_ar?: string;
  id: string;
  working_hrs_ar: string;
  working_hrs_en: string;
  media: [MediaType?]
}