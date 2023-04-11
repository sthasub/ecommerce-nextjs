import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const trolleySlice = createSlice({
  name: "trolley",
  initialState,
  reducers: {
    addTotrolley: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromtrolley: (state, action) => {
      const index = state.items.findIndex(trolleyItem =>
        trolleyItem.id === action.payload.id);
      let newTrolley = [...state.items];
      if(index >= 0){
        //  exist item from trolley removed it
        newTrolley.splice(index, 1); // postion is index, and 1 is number of item remove from postion
      }else{
        console.warn(`cannot remove product ${action.payload.id} as it is not present in trolley`);
      }
      state.items = newTrolley;
    },
  },
});

export const { addTotrolley, removeFromtrolley } = trolleySlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.trolley.items;
export const selectTotal = (state) => state.trolley.items.reduce((total, item)=>total + item.price, 0);

export default trolleySlice.reducer;