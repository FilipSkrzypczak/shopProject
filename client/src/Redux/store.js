import {
   createStore,
   combineReducers,
   applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartSlice from "./Reducers/CartReducers";
import userSlice from "./Reducers/UserReducers";
import {
   productSlice,
   productDetailsSlice,
   categorySlice,
} from "./Reducers/ProductReducers";
import { orderSlice, orderDetailsSlice } from "./Reducers/OrderReducres";
const reducer = combineReducers({
   productList: productSlice.reducer,
   productDetails: productDetailsSlice.reducer,
   categoryList: categorySlice.reducer,
   cart: cartSlice,
   user: userSlice,
   orderDetails: orderDetailsSlice.reducer,
   orderList: orderSlice.reducer,
});

const middleware = [thunk];

const store = createStore(
   reducer,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
