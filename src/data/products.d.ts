
export interface Product {
  id: string;
  name: string;
  description: string;
  category: "vegetable" | "fruit" | "grain";
  price: number;
  unit: string;
  farmName: string;
  image: string;
  organic: boolean;
  quantity: number;
  inStock: boolean;
  farmerId?: string;
}

export interface SoilData {
  id: string;
  farmerId: string;
  farmName: string;
  soilType: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  organicMatter: number;
  location: string;
  date: string;
}
