import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../service/apiBookings";
import type { Booking } from "../types";

export function useBookings() {
  return useQuery<Booking[], Error>({
    queryKey: ["booking"],
    queryFn: getBookings,
  });
}
