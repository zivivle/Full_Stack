import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addTag(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    deleteTag(state, action: PayloadAction<string>) {
      const index = state.findIndex((tag) => tag === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTag, deleteTag } = tagSlice.actions;

export default tagSlice;
