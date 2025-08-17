import axios from "axios";
import { cartClearItems } from "../Reducers/CartReducers";
import {
   orderDetailsFail,
   orderDetailsStart,
   orderDetailsSuccess,
   orderListFail,
   orderListStart,
   orderListSuccess,
} from "../Reducers/OrderReducres";
import { logoutUser } from "../Reducers/UserReducers";
import { URL } from "../Url";

// // ORDER PAY
// export const payOrder =
//    (orderId, paymentResult) => async (dispatch, getState) => {
//       try {
//          dispatch({ type: ORDER_PAY_REQUEST });

//          const {
//             userLogin: { userInfo },
//          } = getState();

//          const config = {
//             headers: {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${userInfo.token}`,
//             },
//          };

//          const { data } = await axios.put(
//             `/api/orders/${orderId}/pay`,
//             paymentResult,
//             config
//          );
//          dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
//       } catch (error) {
//          const message =
//             error.response && error.response.data.message
//                ? error.response.data.message
//                : error.message;
//          if (message === "Brak autoryzacji, błąd tokena") {
//             dispatch(logout());
//          }
//          dispatch({
//             type: ORDER_PAY_FAIL,
//             payload: message,
//          });
//       }
//    };

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch(orderDetailsStart());

      const {
         user: { userInfo },
      } = getState();

      let guestToken;

      if (!userInfo) {
         guestToken = await axios
            .post(`${URL}/api/auth/`)
            .then((response) => response.data);
      }

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo ? userInfo.token : guestToken}`,
         },
      };

      const { data } = await axios.post(`${URL}/api/orders`, order, config);

      dispatch(orderDetailsSuccess(data));

      localStorage.removeItem("cartItems");

      dispatch(cartClearItems());

      guestToken && localStorage.setItem("guest", guestToken);

      return data;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logoutUser());
      }
      dispatch(orderDetailsFail(err));
   }
};

//GET ORDER
export const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch(orderDetailsStart());

      const {
         user: { userInfo },
      } = getState();

      const guestToken = localStorage.getItem("guest");

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo ? userInfo.token : guestToken}`,
         },
      };

      const { data } = await axios.get(`${URL}/api/orders/${id}`, config);

      dispatch(orderDetailsSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logoutUser());
      }
      dispatch(orderDetailsFail(err));
   }
};

// USER ORDERS
export const listUserOrders = (query) => async (dispatch, getState) => {
   try {
      dispatch(orderListStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(
         `${URL}/api/orders/${query ? query : ""}`,
         config
      );
      dispatch(orderListSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logoutUser());
      }
      dispatch(orderListFail(err));
   }
};
