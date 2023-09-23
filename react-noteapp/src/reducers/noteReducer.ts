import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteDateType } from "../types/noteDateTypes";

const initialState: NoteDateType[] = [];

const noteSlice = createSlice({
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
    editNoteTagDelete(
      state,
      action: PayloadAction<{ noteId: string; tag: string }>
    ) {
      const index = state.findIndex(
        (note) => note.id === action.payload.noteId
      );
      if (index !== -1) {
        const tagIndex = state[index].tags.findIndex(
          (tag) => tag === action.payload.tag
        );
        if (tagIndex !== -1) {
          state[index].tags.splice(tagIndex, 1);
        }
      }
    },
    filteredNoteList(state, action: PayloadAction<string>) {
      switch (action.payload) {
        case "lowToHigh":
          state.sort((a, b) => {
            const priorityToNumber = (priority: string) => {
              return priority === "high" ? 1 : 0;
            };
            return priorityToNumber(a.priority) - priorityToNumber(b.priority);
          });
          break;

        case "highToLow":
          state.sort((a, b) => {
            const priorityToNumber = (priority: string) => {
              return priority === "high" ? 1 : 0;
            };
            return priorityToNumber(b.priority) - priorityToNumber(a.priority);
          });
          break;

        case "sortByLatest":
          state.sort(
            (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
          );
          break;

        case "sortByCreated":
          state.sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          );
          break;

        case "sortByEdited":
          state.sort(
            (a, b) =>
              new Date(b.editDate).valueOf() - new Date(a.editDate).valueOf()
          );
          break;

        default:
          state.sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          );
          break;
      }
    },
  },
});

export const {
  addNoteList,
  pinedNoteList,
  archiveNoteList,
  deleteNoteList,
  editNoteList,
  editNoteTagDelete,
  filteredNoteList,
} = noteSlice.actions;

export default noteSlice;
