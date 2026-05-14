import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { supabase } from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  console.log("Deleting guests...");
  const { error } = await supabase.from("guests").delete().gt("id", 0).select();
  if (error) {
    console.log("Delete guests error:", error.message);
  } else {
    console.log("Guests deleted");
  }
}

async function deleteCabins() {
  console.log("Deleting cabins...");
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log("Delete cabins error:", error.message);
}

async function deleteBookings() {
  console.log("Deleting bookings...");
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log("Delete bookings error:", error.message);
}

async function createGuests() {
  console.log("Creating guests...");
  const { data, error } = await supabase.from("guests").insert(guests).select();
  if (error) {
    console.log("Guests error:", error.message);
    console.log("Details:", error.details);
  } else {
    console.log("Created guests:", data?.length);
  }
}

async function createCabins() {
  console.log("Creating cabins...");
  const { data, error } = await supabase.from("cabins").insert(cabins).select();
  if (error) {
    console.log("Create cabins error:", error.message);
  } else {
    console.log("Created cabins:", data?.length);
  }
}

async function createBookings() {
  const { data: guestsData } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsData?.map((g) => g.id) || [];

  const { data: cabinsData } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsData?.map((c) => c.id) || [];

  if (allGuestIds.length === 0 || allCabinIds.length === 0) {
    console.log("No guests or cabins found. Run Upload ALL first.");
    return;
  }

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id - 1);
    const numNights = subtractDates(booking.end_date, booking.start_date);
    const cabinPrice = numNights * (cabin?.regular_price - cabin.discount);
    const extrasPrice = booking.has_breakfast
      ? numNights * 15 * booking.num_guests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights: numNights,
      cabin_price: cabinPrice,
      extra_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      status,
    };
  });

  console.log("Creating bookings...");
  const { data, error } = await supabase
    .from("bookings")
    .insert(finalBookings)
    .select();
  if (error) {
    console.log("Create bookings error:", error.message);
    console.log("Details:", error.details);
  } else {
    console.log("Created bookings:", data?.length);
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings must be deleted first because of foreign key constraints
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Now create fresh data
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
