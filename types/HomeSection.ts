import { MediaType } from './media';

export type HomeSectionType = {
	id: string;
	name: {
		ar: string;
		en: string;
	};
	media?: MediaType;
	description_ar: string;
	description_en: string;
};
