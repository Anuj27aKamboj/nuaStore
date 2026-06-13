import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartState, CartAction } from '../types';
import { cartReducer, initialState } from './cartReducer';

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartState {
  try {
    const saved = localStorage.getItem('cart');
    if (saved) return { ...JSON.parse(saved), isOpen: false };
  } catch {
    throw new Error('Cart not saved')
  }
  return initialState;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
