import { configureStore } from "@reduxjs/toolkit";
import trolleyReducer from "../slices/trolleySlice";

//global store
export const store = configureStore({
  reducer: {
    trolley: trolleyReducer,
  },
});