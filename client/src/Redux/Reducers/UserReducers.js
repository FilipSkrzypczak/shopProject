import { createSlice } from "@reduxjs/toolkit";

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;

// address
const addressFromLocalStorage = localStorage.getItem("address")
   ? JSON.parse(localStorage.getItem("address"))
   : null;

const initialState = {
   userInfo: userInfoFromLocalStorage,
   loading: false,
   error: false,
   address: addressFromLocalStorage,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      loginStart: (state) => {
         state.loading = true;
      },
      loginSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.userInfo = action.payload;
      },
      loginFail: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      logoutUser: (state) => {
         return { ...initialState };
      },
      registerStart: (state) => {
         state.loading = true;
      },
      registerSuccess: (state) => {
         state.loading = false;
         state.error = false;
      },
      registerFail: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      userUpdateStart: (state) => {
         state.loading = true;
      },
      userUpdateSuccess: (state, action) => {
         state.loading = false;
         state.error = false;
         state.userInfo = action.payload;
      },
      userUpdateFail: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      userReviewsStart: (state) => {
         state.loading = true;
      },
      userReviewsSuccess: (state, action) => {
         state.loading = false;
         state.userReviews = action.payload;
         state.error = false;
      },
      userReviewsFail: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      userSaveAddress: (state, action) => {
         state.address = action.payload;
      },
   },
});

export const {
   loginStart,
   loginSuccess,
   loginFail,
   logoutUser,
   registerStart,
   registerSuccess,
   registerFail,
   userUpdateStart,
   userUpdateSuccess,
   userUpdateFail,
   userReviewsStart,
   userReviewsSuccess,
   userReviewsFail,
   userSaveAddress,
} = userSlice.actions;

export default userSlice.reducer;
