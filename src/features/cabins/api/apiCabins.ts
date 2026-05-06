import { supabase, supabaseUrl } from "../../../core/services/supabase";
import type { Cabin, CabinFormData } from "../types";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data as Cabin[];
}

export async function deleteCabin(id: number): Promise<void> {
  const response = await supabase.from("cabins").delete().eq("id", id).select(); // This forces Supabase to return deleted row

  console.log(response);

  const { data, error } = response;
  if (error) throw new Error("Cabin could not be deleted");

  // If data is empty but no error, RLS likely blocked it
  if (!data || data.length === 0) {
    throw new Error("Cabin could not be deleted - access denied");
  }
}

export async function createCabin(cabin: CabinFormData): Promise<Cabin[]> {
  // 1. Create a unique image name and the path
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  // This is the URL that will be stored in the 'image' column of your 'cabins' table
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 2. Upload the image to the 'cabin-images' bucket
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }
  // 3. Create the cabin in the database
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }]) // Use the imagePath URL here
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    // Optional: If there was an error creating the cabin, delete the uploaded image
    await supabase.storage.from("cabin-images").remove([imageName]);
    throw new Error("Cabin could not be created");
  }

  return data as Cabin[];
}

export async function updateCabin(
  newCabinData: CabinFormData,
  id: number,
): Promise<Cabin> {
  // 1. Determine if we need to upload a new image
  const hasImagePath = typeof newCabinData.image === "string";
  let imagePath = newCabinData.image;

  if (!hasImagePath) {
    // A new file was uploaded
    const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll(
      "/",
      "",
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabins-images")
      .upload(imageName, newCabinData.image);

    if (storageError) {
      // console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  // 2. Update the cabin in the DB
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabinData, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    // console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data as Cabin;
}
