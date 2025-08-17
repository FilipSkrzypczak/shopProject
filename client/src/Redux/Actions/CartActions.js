import axios from "axios";
import { addItemToCart, removeItemFromCart } from "../Reducers/CartReducers";
import { URL } from "../Url";

// ADD TO CART
export const addToCart = (id, qty, fromCart) => async (dispatch, getState) => {
   const { data } = await axios.get(`${URL}/api/products/${id}`);

   const { _id, name, image, countInStock, price } = data;

   dispatch(
      addItemToCart({ _id, name, image, countInStock, price, qty, fromCart })
   );

   localStorage.setItem("cartItems", JSON.stringify(getState().cart));
};

// REMOVE PRODUCT FROM CART
export const removeFromCart = (item) => async (dispatch, getState) => {
   dispatch(removeItemFromCart(item));

   localStorage.setItem("cartItems", JSON.stringify(getState().cart));
};
