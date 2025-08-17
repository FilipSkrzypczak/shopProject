import axios from "axios";
import {
   orderDetailsFail,
   orderDetailsStart,
   orderDetailsSuccess,
   orderListFail,
   orderListStart,
   orderListSuccess,
} from "../Reducers/OrderReducers";
import { URL } from "../Url";
import { logout } from "./UserActions";

export const listOrders = () => async (dispatch, getState) => {
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

      const { data } = await axios.get(`${URL}/api/orders/all`, config);

      dispatch(orderListSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(orderListFail(err));
   }
};

export const getOrder = (id) => async (dispatch, getState) => {
   try {
      dispatch(orderDetailsStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
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
         dispatch(logout());
      }
      dispatch(orderDetailsFail(err));
   }
};
