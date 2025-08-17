import { createSlice } from "@reduxjs/toolkit";

const initialStateCat = {
   categories: [],
   loading: false,
   error: false,
};

export const categorySlice = createSlice({
   name: "categories",
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
      categoryDeleteStart: (state) => {
         state.loading = true;
      },
      categoryDeleteSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.categories = state.categories.filter(
            (p) => p._id !== action.payload
         );
      },
      categoryDeleteFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const {
   categoryListStart,
   categoryListSuccess,
   categoryListFail,
   categoryDeleteStart,
   categoryDeleteSuccess,
   categoryDeleteFail,
} = categorySlice.actions;

const initialStateCatDetails = {
   category: null,
   loading: false,
   error: false,
};

export const categoryDetailsSlice = createSlice({
   name: "category",
   initialState: initialStateCatDetails,
   reducers: {
      categoryDetailsStart: (state) => {
         state.loading = true;
      },
      categoryDetailsSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.category = action.payload;
      },
      categoryDetailsFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      categoryCreateStart: (state) => {
         state.loading = true;
      },
      categoryCreateSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.category = action.payload;
      },
      categoryCreateFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const {
   categoryDetailsStart,
   categoryDetailsSuccess,
   categoryDetailsFail,
   categoryCreateStart,
   categoryCreateSuccess,
   categoryCreateFail,
} = categoryDetailsSlice.actions;

const initialStateProd = {
   products: [],
   loading: false,
   error: false,
   reviews: [],
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
         state.products = action.payload;
      },
      productListFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      productDeleteStart: (state) => {
         state.loading = true;
      },
      productDeleteSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.products = state.products.filter(
            (p) => p._id !== action.payload
         );
      },
      productDeleteFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      reviewListStart: (state) => {
         state.loading = true;
      },
      reviewListSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.reviews = action.payload;
      },
      reviewListFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const {
   productListStart,
   productListSuccess,
   productListFail,
   productDeleteStart,
   productDeleteSuccess,
   productDeleteFail,
   reviewListStart,
   reviewListSuccess,
   reviewListFail,
} = productSlice.actions;

const initialStateProdDetails = {
   product: null,
   loading: false,
   error: false,
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
      },
      productDetailsFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      productCreateStart: (state) => {
         state.loading = true;
      },
      productCreateSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.product = action.payload;
      },
      productCreateFail: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const {
   productDetailsStart,
   productDetailsSuccess,
   productDetailsFail,
   productCreateStart,
   productCreateSuccess,
   productCreateFail,
} = productDetailsSlice.actions;
