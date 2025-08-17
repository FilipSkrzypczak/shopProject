import axios from "axios";
import {
  productListFail,
  productListStart,
  productListSuccess,
  categoryListFail,
  categoryListStart,
  categoryListSuccess,
  productDetailsStart,
  productDetailsSuccess,
  productDetailsFail,
  productReviewSuccess,
  productReviewStart,
  productReviewFail,
} from "../Reducers/ProductReducers";
import { logout } from "./UserActions";
import { URL } from "../Url";

export const listProduct =
  (keyword = "", pageNumber = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch(productListStart());
      const { data } = await axios.get(
        `${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`
      );
      dispatch(productListSuccess(data));
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(productListFail(err));
    }
  };

export const listCategory = () => async (dispatch) => {
  try {
    dispatch(categoryListStart());
    const { data } = await axios.get(`${URL}/api/categories`);
    dispatch(categoryListSuccess(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(categoryListFail(err));
  }
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsStart());
    const { data } = await axios.get(`${URL}/api/products/${id}`);
    dispatch(productDetailsSuccess(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(productDetailsFail(err));
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productReviewStart());

      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${URL}/api/products/${productId}/review`,
        review,
        config
      );
      dispatch(productReviewSuccess());
      return true;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Brak autoryzacji, błąd tokena") {
        dispatch(logout());
      }
      dispatch(productReviewFail(message));
      return false;
    }
  };
