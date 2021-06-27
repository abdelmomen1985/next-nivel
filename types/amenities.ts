import { MediaType } from './media';

export type AmenityType = {
  description_ar?: string;
  description_en?: string;
  id: string;
  media: [MediaType?];
  name: {
    ar: string;
    en: string;
  }
}