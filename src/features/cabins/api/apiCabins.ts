import { supabase } from "../../../core/services/supabase";
import type { Cabin, CabinFormData } from "../types";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) throw new Error("Cabins could not be loaded");
  return data as Cabin[];
}