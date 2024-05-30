import {  createSlice } from "@reduxjs/toolkit";

const counterReducer = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export interface IAuthState {
  cartState: any[];
}

const initialState: IAuthState = {
  cartState: [],
};

const checkoutReducer = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addProduct: (state, action: any) => {
      state.cartState = action.payload;
    },
  },
});



export const { increment, decrement } = counterReducer.actions;
export const { addProduct } = checkoutReducer.actions;

export const checkout = checkoutReducer.reducer;
