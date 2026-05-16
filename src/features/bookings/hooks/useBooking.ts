import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBooking,
  getBookings,
  updateBooking,
  type filterInterface,
  type GetBookingsResponse,
  type SortInterface,
} from "../service/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../core/utils/constants";
import type { Booking, BookingForm } from "../types";
import toast from "react-hot-toast";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  // QUERY
  const { isPending, data, error } = useQuery<GetBookingsResponse, Error>({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // PRE-FETCHING
  const count = data?.count || 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Prefetch next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });

  // Prefetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });

  return { isPending, data, error };
}

export function useBooking(id: Number) {
  const { isPending, data, error } = useQuery<Booking, Error>({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { isPending, data, error };
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation<
    Booking,
    Error,
    { id: Number; data: BookingForm }
  >({
    mutationFn: ({ id, data }) => updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("Booking successfully checked in");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkin, isCheckingIn };
}
