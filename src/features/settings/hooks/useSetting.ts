import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Setting, SettingForm } from "../types";
import { getSettings, updateSetting } from "../api/apiSettings";
import toast from "react-hot-toast";

export function useSettings() {
  return useQuery<Setting, Error>({
    queryKey: ["setting"],
    queryFn: getSettings,
  });
}
export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isPending: isEditing } = useMutation<
    Setting, // The type of data returned by the API
    Error, // The error type
    SettingForm
  >({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
      toast.success("Setting successfully edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editSetting, isEditing };
}
