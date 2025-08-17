import {
   createStore,
   combineReducers,
   applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userSlice, usersSlice } from "./Reducers/UserReducers";
import {
   productSlice,
   categorySlice,
   productDetailsSlice,
   categoryDetailsSlice,
} from "./Reducers/ProductReducers";
import { orderSlice, orderDetailsSlice } from "./Reducers/OrderReducers";
const reducer = combineReducers({
   productList: productSlice.reducer,
   productDetails: productDetailsSlice.reducer,
   categoryList: categorySlice.reducer,
   categoryDetails: categoryDetailsSlice.reducer,
   user: userSlice.reducer,
   userList: usersSlice.reducer,
   orderList: orderSlice.reducer,
   orderDetails: orderDetailsSlice.reducer,
});

const middleware = [thunk];

const store = createStore(
   reducer,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
