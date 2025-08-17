import { createSlice } from "@reduxjs/toolkit";

const initialStateCat = {
   categories: [],
   loading: false,
   error: false,
};

export const categorySlice = createSlice({
   name: "category",
   initialState: initialStateCat,
   reducers: {
      categoryListStart: (state) => {
         state.loading = true;
      },
      categoryListSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.categories = action.payload;
      },
      categoryListFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const { categoryListStart, categoryListSuccess, categoryListFail } =
   categorySlice.actions;

const initialStateProd = {
   products: [],
   pages: 0,
   page: 0,
   loading: false,
   error: false,
};

export const productSlice = createSlice({
   name: "products",
   initialState: initialStateProd,
   reducers: {
      productListStart: (state) => {
         state.loading = true;
      },
      productListSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.products = action.payload.products;
         state.page = action.payload.page;
         state.pages = action.payload.pages;
      },
      productListFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const { productListStart, productListSuccess, productListFail } =
   productSlice.actions;

const initialStateProdDetails = {
   product: null,
   loading: false,
   error: false,
   errorReview: false,
};

export const productDetailsSlice = createSlice({
   name: "product",
   initialState: initialStateProdDetails,
   reducers: {
      productDetailsStart: (state) => {
         state.loading = true;
      },
      productDetailsSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.product = action.payload;
         state.errorReview = false;
      },
      productDetailsFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      productReviewStart: (state) => {
         state.loading = true;
      },
      productReviewSuccess: (state) => {
         state.loading = false;
         state.errorReview = false;
      },
      productReviewFail: (state, action) => {
         state.loading = false;
         state.errorReview = action.payload;
      },
   },
});

export const {
   productDetailsStart,
   productDetailsSuccess,
   productDetailsFail,
   productReviewStart,
   productReviewSuccess,
   productReviewFail,
} = productDetailsSlice.actions;
