import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../utils/biletoserviceApiTypes";
import { RootState } from "./store";
import { MAX_TICKETS_LIMIT } from "../../utils/consts";

export interface ICartItem {
  quantity: number;
  movie: IMovie;
}

export interface CartState {
  value: number;
  cart: {
    [Key: IMovie["id"]]: ICartItem;
  };
}

const initialState: CartState = {
  value: 0,
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<IMovie>) => {
      const currentItem = state.cart[action.payload.id];
      if (currentItem && currentItem.quantity === MAX_TICKETS_LIMIT) return;
      state.cart[action.payload.id] = {
        quantity: currentItem ? ++currentItem.quantity : 1,
        movie: action.payload,
      };
    },

    decrement: (state, action: PayloadAction<IMovie>) => {
      const currentItem = state.cart[action.payload.id];
      if (!currentItem) return;
      if (currentItem && currentItem.quantity === 1) {
        delete state.cart[action.payload.id];
        return;
      }
      state.cart[action.payload.id] = {
        quantity: currentItem ? --currentItem.quantity : 1,
        movie: action.payload,
      };
    },

    deleteItem: (state, action: PayloadAction<IMovie["id"]>) => {
      delete state.cart[action.payload];
    },
  },
});

export const selectCartTotal = (state: RootState) => {
  let total = 0;
  for (let id in state.cart.cart) {
    total += state.cart.cart[id].quantity;
  }
  return total;
};

export const selectMovieQuantity = (movieIdQuery: IMovie["id"]) => (state: RootState) => {
  const currentMovie = state.cart.cart[movieIdQuery];
  return currentMovie?.quantity || 0;
};

export const selectCart = (state: RootState) => {
  const cartItems = [];
  for (let id in state.cart.cart) {
    cartItems.push(state.cart.cart[id].movie);
  }
  return cartItems;
};

export const { increment, decrement, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
