import axios from "axios";
import {
   loginStart,
   loginSuccess,
   loginFail,
   logoutUser,
   userListStart,
   userListFail,
   userListSuccess,
} from "../Reducers/UserReducers";
import { URL } from "../Url";

// LOGIN
export const login = (email, password) => async (dispatch) => {
   try {
      dispatch(loginStart());

      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const { data } = await axios.post(
         `${URL}/api/users/login`,
         { email, password },
         config
      );

      if (!data.isAdmin === true) {
         dispatch(loginFail("Brak dostępu"));
      } else {
         dispatch(loginSuccess(data));
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(loginFail(err));
   }
};

// LOGOUT
export const logout = () => (dispatch) => {
   localStorage.removeItem("userInfo");
   dispatch(logoutUser());
   window.location.href = "/login";
   // dispatch({ type: ORDER_LIST_MY_RESET });
};

// GET ALL USERS
export const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch(userListStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`${URL}/api/users/`, config);

      dispatch(userListSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(userListFail(err));
   }
};
