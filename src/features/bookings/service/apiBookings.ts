import { getToday } from "../../../core/utils/helpers";
import { supabase } from "../../../core/services/supabase";
import type { Booking, BookingForm } from "../types";
import { PAGE_SIZE } from "../../../core/utils/constants";

export interface filterInterface {
  field: string;
  value: string;
}

export interface SortInterface {
  field: string;
  direction: string;
}
export interface GetBookingsResponse {
  data: Booking[];
  count: number | null;
}

export async function getBookings(
  filter: filterInterface | null,
  sort: SortInterface | null,
  page: number | null,
): Promise<GetBookingsResponse> {
  let query = supabase
    .from("bookings")
    .select(
      "*, cabins(name, image), guests(full_name, email, nationality, country_flag)",
      { count: "exact" },
    );

  if (filter) query = query.eq(filter.field, filter.value);

  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("no Booking found");
  }

  return { data: data as Booking[], count };
}

export async function getBooking(id: Number): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, cabins(name, image), guests(full_name, email, nationality, country_flag)",
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as Booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.end_date)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: Number, obj: BookingForm) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: Number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
