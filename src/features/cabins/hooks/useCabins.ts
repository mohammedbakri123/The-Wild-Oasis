import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCabin as addCabin,
  deleteCabin,
  getCabins,
  updateCabin,
} from "../api/apiCabins";
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
      toast.success("Cabin deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation<
    Cabin[],
    Error,
    CabinFormData
  >({
    mutationFn: addCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin Created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabin, isCreating };
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation<
    Cabin, // The type of data returned by the API
    Error, // The error type
    { newCabinData: CabinFormData; id: number }
  >({
    mutationFn: ({ newCabinData, id }) => updateCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
