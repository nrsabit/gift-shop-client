import {  createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type StateType = {
  product: any;
};

const initialState: StateType = {
  product: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const { product } = action.payload;
      const priceString = product.productPrice;
      const priceWithoutSign = priceString.slice(1);
      const priceInNumber = parseFloat(priceWithoutSign);

      state.product = { ...product, productPrice: priceInNumber };
    },
  },
});

export const { setProduct } = ProductSlice.actions;

export default ProductSlice.reducer;

export const selectedProduct = (state: RootState) => state.product.product;
