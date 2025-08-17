import { createSlice } from "@reduxjs/toolkit";

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;

const initialStateUser = {
   userInfo: userInfoFromLocalStorage,
   loading: false,
   error: false,
};

export const userSlice = createSlice({
   name: "user",
   initialState: initialStateUser,
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
         return { ...initialStateUser };
      },
   },
});

export const { loginStart, loginSuccess, loginFail, logoutUser } =
   userSlice.actions;

const initialStateUsers = {
   users: [],
   loading: false,
   error: false,
};

export const usersSlice = createSlice({
   name: "users",
   initialState: initialStateUsers,
   reducers: {
      userListStart: (state) => {
         state.loading = true;
      },
      userListSuccess: (state, action) => {
         state.loading = false;
         state.users = action.payload;
         state.error = false;
      },
      userListFail: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
   },
});

export const { userListStart, userListSuccess, userListFail } =
   usersSlice.actions;
