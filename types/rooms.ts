export type RoomType = {
  id: string,
  description?: string
  media?: {
    icon?: string,
    images?: [string]
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
  }

}