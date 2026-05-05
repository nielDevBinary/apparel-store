export interface Variant {
  id: string;
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women";
  image: string;
  description: string;
  isNew?: boolean;
  variants: Variant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;

  name: string;
  price: number;
  image: string;
  size: string;
  stock: number;
}
