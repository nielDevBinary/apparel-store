import type { Product } from "../type";
import { api } from "./BaseService";

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function mapApiToProduct(item: ApiProduct): Product | null {
  if (
    item.category !== "men's clothing" &&
    item.category !== "women's clothing"
  ) {
    return null;
  }

  return {
    id: item.id.toString(),
    name: item.title,
    price: item.price,
    category: item.category === "men's clothing" ? "men" : "women",
    image: item.image,
    description: item.description,
    isNew: item.id % 5 === 0,
    variants: [
      { id: `${item.id}-S`, size: "S", stock: 10 },
      { id: `${item.id}-M`, size: "M", stock: 8 },
      { id: `${item.id}-L`, size: "L", stock: 5 },
    ],
  };
}

export const axiosProducts = async (): Promise<Product[]> => {
  try {
    const response = await api().get("/products");

    const data: ApiProduct[] = response.data;

    return data
      .map(mapApiToProduct)
      .filter((item): item is Product => item !== null);
  } catch (error) {
    console.error("Error axios products:", error);
    return [];
  }
};



export const axiosProductsById = async (
  id: string,
): Promise<Product | null> => {
  try {
    const response = await api().get(`/products/${id}`);

    const item: ApiProduct = response.data;

    return mapApiToProduct(item);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
