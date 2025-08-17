import { createSlice } from "@reduxjs/toolkit";

const cartFromLocalStorage = localStorage.getItem("cartItems")
   ? JSON.parse(localStorage.getItem("cartItems"))
   : {
        cartItems: [],
        quantity: 0,
        total: 0,
     };

const initialState = cartFromLocalStorage;

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItemToCart: (state, action) => {
         const { fromCart, ...product } = action.payload;
         let existingItemQty = null;
         const inCart = state.cartItems.some(
            (item) => item._id === product._id
         );
         inCart
            ? (state.cartItems = state.cartItems.map((item) => {
                 if (item._id === product._id) {
                    existingItemQty = fromCart && product.qty - item.qty;
                    return {
                       ...item,
                       qty: fromCart ? product.qty : (item.qty += product.qty),
                    };
                 } else {
                    return item;
                 }
              }))
            : state.cartItems.push(product);

         existingItemQty || existingItemQty === 0
            ? (state.quantity += existingItemQty)
            : (state.quantity += product.qty);
         existingItemQty || existingItemQty === 0
            ? (state.total += product.price * existingItemQty)
            : (state.total += product.price * product.qty);
      },
      removeItemFromCart: (state, action) => {
         state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
         );
         state.quantity -= action.payload.qty;
         state.total -= action.payload.price * action.payload.qty;
      },
      cartClearItems: (state) => {
         return { ...initialState };
      },
   },
});

export const { addItemToCart, removeItemFromCart, cartClearItems } =
   cartSlice.actions;

export default cartSlice.reducer;
