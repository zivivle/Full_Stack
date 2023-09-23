import { combineReducers } from "@reduxjs/toolkit";
import noteSlice from "./noteReducer";
import tagSlice from "./tagReducer";

const rootReducer = combineReducers({
  note: noteSlice.reducer,
  tag: tagSlice.reducer,
});

export default rootReducer;
