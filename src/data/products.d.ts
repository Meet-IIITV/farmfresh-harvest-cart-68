
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  farmName: string;
  organic?: boolean;
  farmerId?: string;
  quantity?: number;
}
