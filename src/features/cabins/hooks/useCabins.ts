import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCabin, deleteCabin, getCabins } from "../api/apiCabins";
import type { Cabin, CabinFormData } from "../types";
import toast from "react-hot-toast";

export function useCabins() {
  return useQuery<Cabin[], Error>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully") 
       },
    onError: (err) => {toast.error(err.message)},
  });
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  return useMutation<Cabin[], Error, CabinFormData>({
    mutationFn: createCabin,
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin Created successfully") 
       },
    onError: (err) => {toast.error(err.message)},
  });
}
// export function useUpdateCabin() {
//   const queryClient = useQueryClient();
//   return useMutation<Cabin, Error, { id: string; data: Partial<CabinFormData> }>({
//     mutationFn: ({ id, data }) => updateCabin(id, data),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
//   });
// }
