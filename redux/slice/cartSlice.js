import { createSlice } from "@reduxjs/toolkit";
import { storeData, getData } from "../../CustomHook/function";

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const tempProduct = { ...action.payload, cartQuantity: 1 }
      state.cartItems.push(tempProduct)
      storeData(state.cartItems)
    },
    REMOVE_TO_CART: (state, action) => {
      getData().then((items) => {
        const newItems = items.filter((item) => item.id !== action.payload.id)
        storeData(newItems)
      })
    }
  },
});

export const { ADD_TO_CART, REMOVE_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
