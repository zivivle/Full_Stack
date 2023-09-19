import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "types/productTypes";

type CartProductType = ProductItem[];
const initialState: CartProductType = [];

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<ProductItem>) {
      const existingProduct = state.find(
        (product) => product.title === action.payload.title
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.push({ ...action.payload, count: 1 });
      }
    },
    deleteCart(state, action: PayloadAction<ProductItem>) {
      return state.filter((product) => product.title !== action.payload.title);
    },
    incrementItemCount(state, action: PayloadAction<ProductItem>) {
      const existingProduct = state.find(
        (product) => product.title === action.payload.title
      );
      if (existingProduct) {
        existingProduct.count += 1;
      }
    },
    decrementItemCount(state, action: PayloadAction<ProductItem>) {
      const existingProduct = state.find(
        (product) => product.title === action.payload.title
      );
      if (existingProduct && existingProduct.count > 1) {
        existingProduct.count -= 1;
      }
    },
  },
});

export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});

export const { addCart, deleteCart, incrementItemCount, decrementItemCount } =
  cart.actions;
