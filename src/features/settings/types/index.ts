export interface Setting {
  id: number;
  breakfast_price: number;
  max_booking_length: number;

  max_guests_per_booking: number;

  min_booking_length: number;

  created_at?: string;
}

// interface SettingForm {
//   breakfast_price: number;
//   max_booking_length: number;

//   max_guests_per_booking: number;

//   min_booking_length: number;

//   created_at?: string;
// }
export type SettingForm = Partial<Setting>;
