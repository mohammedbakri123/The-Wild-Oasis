export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";
export interface Booking {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  status: BookingStatus;
  total_price: number;
  cabin_price: number;
  extra_price: number;
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string | null;
  cabin_id: number;
  guest_id: number;
  cabins: { name: string; image: string } | null;
  guests: {
    full_name: string;
    email: string;
    nationality: string;
    country_flag: string;
  } | null;
}

export type BookingForm = Partial<Booking>;
