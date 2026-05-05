import { supabase } from "../../../core/services/supabase";
import type { Cabin, CabinFormData } from "../types";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) throw new Error("Cabins could not be loaded");
  return data as Cabin[];
}

export async function deleteCabin(id: number): Promise<void> {
  const response = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    .select();  // This forces Supabase to return deleted row

    console.log(response);

   const { data, error } = response;
  if (error) throw new Error("Cabin could not be deleted");
  
  // If data is empty but no error, RLS likely blocked it
  if (!data || data.length === 0) {
    throw new Error("Cabin could not be deleted - access denied");
  }
}

export async function createCabin(cabin: CabinFormData):Promise<Cabin[]> {
  
const response = await supabase
  .from('cabins')
  .insert([
    cabin,
  ])
  .select();

  const {data, error} = response;

  if (error) throw new Error("Cabin could not be created");
  
  // If data is empty but no error, RLS likely blocked it
  if (!data || data.length === 0) {
    throw new Error("Cabin could not be created - access denied");
  }

  return data as Cabin[];
}