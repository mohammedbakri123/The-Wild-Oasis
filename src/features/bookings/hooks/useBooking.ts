import { useQuery } from "@tanstack/react-query";
import {
  getBookings,
  type filterInterface,
  type SortInterface,
} from "../service/apiBookings";
import type { Booking } from "../types";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter: filterInterface | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRow = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortByRow?.split("-");

  const sortBy: SortInterface = { field, direction };

  return useQuery<Booking[], Error>({
    queryKey: ["booking", filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });
}
