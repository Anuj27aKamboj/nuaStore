import type { CartState, CartAction } from "../types";

export const initialState: CartState = {
  items: [],
  isOpen: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.colour === action.payload.colour &&
          item.size === action.payload.size,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId &&
            item.colour === action.payload.colour &&
            item.size === action.payload.size
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + action.payload.quantity,
                    5,
                  ),
                } // cap at 5
              : item,
          ),
        };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.colour === action.payload.colour &&
              item.size === action.payload.size
            ),
        ),
      };

    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.colour === action.payload.colour &&
                item.size === action.payload.size
              ),
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.colour === action.payload.colour &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.qty }
            : item,
        ),
      };

    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}
