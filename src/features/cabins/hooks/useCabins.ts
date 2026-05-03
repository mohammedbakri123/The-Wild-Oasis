import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCabin, getCabins } from "../api/apiCabins";
import type { Cabin } from "../types";

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
    onError: (err) => {console.log("Delete failed:", err.message);},
  });
}

// export function useCreateCabin() {
//   const queryClient = useQueryClient();
//   return useMutation<Cabin, Error, CabinFormData>({
//     mutationFn: createCabin,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
//   });
// }
// export function useUpdateCabin() {
//   const queryClient = useQueryClient();
//   return useMutation<Cabin, Error, { id: string; data: Partial<CabinFormData> }>({
//     mutationFn: ({ id, data }) => updateCabin(id, data),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
//   });
// }
