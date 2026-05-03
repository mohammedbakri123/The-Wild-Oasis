export interface Cabin {
  id: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
  created_at?: string;
}
export interface CabinFormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description: string;
  image: string;
}