import { configureStore, createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addCart(state, action) {
			const existingProduct = state.find(
				product => product.name === action.payload.name,
			);
			if (existingProduct) {
				existingProduct.count += 1;
			} else {
				state.push({ ...action.payload, count: 1 });
				console.log("state", state.count);
			}
		},
		deleteCart(state, action) {
			return state.filter(product => product.name !== action.payload.name);
		},
		incrementItemCount(state, action) {
			const existingProduct = state.find(
				product => product.name === action.payload.name,
			);
			if (existingProduct) {
				existingProduct.count += 1;
			}
		},
		decrementItemCount(state, action) {
			const existingProduct = state.find(
				product => product.name === action.payload.name,
			);
			if (existingProduct && existingProduct.count > 1) {
				existingProduct.count -= 1;
			}
		},
	},
});
console.log("cart", cart);

export default configureStore({
	reducer: {
		cart: cart.reducer,
	},
});

export const { addCart, deleteCart, incrementItemCount, decrementItemCount } =
	cart.actions;
