export type RoomType = {
  id: string,
  description?: string
  media?: {
    icon?: string,
    room_images?: [string]
  },
  title: {
    ar: string,
    en: string,
  },
  room_rates: {
    id: string,
    base_price: number,
    rate: {
      id: string,
      title: {
        ar: string,
        en: string,
      },
      description?: {
        ar: string,
        en: string,
      },
    }
  },
  accessibility: false,
  room_type: {
    type: string,
  }

}