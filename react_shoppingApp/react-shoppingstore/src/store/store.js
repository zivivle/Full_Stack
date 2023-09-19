import { configureStore, createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addCart(state, action) {
			const existingProduct = state.find(
				product => product.title === action.payload.title,
			);
			if (existingProduct) {
				existingProduct.count += 1;
			} else {
				state.push({ ...action.payload, count: 1 });
			}
		},
		deleteCart(state, action) {
			return state.filter(product => product.title !== action.payload.title);
		},
		incrementItemCount(state, action) {
			const existingProduct = state.find(
				product => product.title === action.payload.title,
			);
			if (existingProduct) {
				existingProduct.count += 1;
			}
		},
		decrementItemCount(state, action) {
			const existingProduct = state.find(
				product => product.title === action.payload.title,
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
