import axios from "axios";
import {
   loginStart,
   loginSuccess,
   loginFail,
   logoutUser,
   registerStart,
   registerSuccess,
   registerFail,
   userReviewsStart,
   userReviewsSuccess,
   userReviewsFail,
   userUpdateSuccess,
   userUpdateStart,
   userUpdateFail,
   userSaveAddress,
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

      dispatch(loginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
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

// REGISTER
export const register = (userData) => async (dispatch) => {
   try {
      dispatch(registerStart());

      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      await axios.post(`${URL}/api/users`, userData, config);
      dispatch(registerSuccess());
      window.location.href = "/login";
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch(registerFail(err));
   }
};

// GET USER REVIEWS
export const getUserReviews = () => async (dispatch, getState) => {
   try {
      dispatch(userReviewsStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`${URL}/api/products/reviews`, config);
      dispatch(userReviewsSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch(userReviewsFail(err));
   }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch(userUpdateStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put(
         `${URL}/api/users/profile`,
         user,
         config
      );
      dispatch(userUpdateSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
      return true;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(userUpdateFail(err));
      return false;
   }
};

// SAVE ADDRESS
export const saveAddress = (data) => async (dispatch) => {
   dispatch(userSaveAddress(data));

   localStorage.setItem("address", JSON.stringify(data));
};
