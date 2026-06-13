export interface Product {
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

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  colour: string;
  size: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; colour: string; size: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: number; colour: string; size: string; qty: number } }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'CLOSE_DRAWER' };
