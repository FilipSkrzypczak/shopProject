import { createSlice } from "@reduxjs/toolkit";

const initialStateOrder = {
   orders: [],
   loading: false,
   error: false,
};

export const orderSlice = createSlice({
   name: "orders",
   initialState: initialStateOrder,
   reducers: {
      orderListStart: (state) => {
         state.loading = true;
      },
      orderListSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.orders = action.payload;
      },
      orderListFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const { orderListStart, orderListSuccess, orderListFail } =
   orderSlice.actions;

const initialStateOrderDetails = {
   order: null,
   loading: false,
   error: false,
};

export const orderDetailsSlice = createSlice({
   name: "order",
   initialState: initialStateOrderDetails,
   reducers: {
      orderDetailsStart: (state) => {
         state.loading = true;
      },
      orderDetailsSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.order = action.payload;
      },
      orderDetailsFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const { orderDetailsStart, orderDetailsSuccess, orderDetailsFail } =
   orderDetailsSlice.actions;
