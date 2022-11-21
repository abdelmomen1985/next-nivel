export type BookingData = {
  customer: {
    name: string;
    phone: string;
    country: string;
    city: string;
  };
  room: {
    name: string;
  };
  stay: {
    check_in: string;
    check_out: string;
    package_price: number;
    special_requests: string[] | null;
  };
};
