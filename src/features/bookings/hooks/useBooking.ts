import { useQuery } from "@tanstack/react-query";
import {
  getBookings,
  type filterInterface,
  type GetBookingsResponse,
  type SortInterface,
} from "../service/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter: filterInterface | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORTING
  const sortByRow = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortByRow?.split("-");

  const sortBy: SortInterface = { field, direction };

  //PAGINATIONS
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  return useQuery<GetBookingsResponse, Error>({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });
}
