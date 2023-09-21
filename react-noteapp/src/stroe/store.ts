import { NoteDateType } from "./../types/noteDateTypes";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NoteDateType[] = [];

const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNoteList(state, action: PayloadAction<NoteDateType[]>) {
      state.push(...action.payload);
    },
    pinedNoteList(state, action: PayloadAction<string>) {
      const index = state.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state[index].pined = !state[index].pined;
      }
    },
    archiveNoteList(state, action: PayloadAction<string>) {
      const index = state.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state[index].archive = !state[index].archive;
      }
    },
    deleteNoteList(state, action: PayloadAction<string>) {
      const index = state.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state[index].deleteData = !state[index].deleteData;
      }
    },
    editNoteList(state, action: PayloadAction<NoteDateType>) {
      const index = state.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export default configureStore({
  reducer: {
    note: note.reducer,
  },
});

export const {
  addNoteList,
  pinedNoteList,
  archiveNoteList,
  deleteNoteList,
  editNoteList,
} = note.actions;
