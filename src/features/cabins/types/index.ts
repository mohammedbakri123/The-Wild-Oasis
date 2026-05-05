export interface Cabin {
  id: number;
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
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;}