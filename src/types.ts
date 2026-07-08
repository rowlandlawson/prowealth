export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Perfumes' | 'Accessories' | 'Dresses' | 'Bags';
  image: string;
  description: string;
  details?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
