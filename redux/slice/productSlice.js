import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCT(state, action) {
      state.products = action.payload.products
    },
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload
      const tempProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.brand.toLowerCase().includes(search.toLowerCase()))
      state.searchProducts = tempProducts
    },
  },
});

export const { STORE_PRODUCT, FILTER_BY_SEARCH } = productSlice.actions;
export const selectProducts = (state) => state.product.products
export const selectSearchProducts = (state) => state.product.searchProducts

export default productSlice.reducer;
