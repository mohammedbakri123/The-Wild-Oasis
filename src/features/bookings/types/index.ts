export interface Booking {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  status: string;
  total_price: number;
  cabin_price: number;
  extra_price: number;
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string | null;
  cabin_id: number;
  guest_id: number;
}
