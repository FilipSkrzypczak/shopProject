import axios from "axios";
import {
   productListFail,
   productListStart,
   productListSuccess,
   categoryListFail,
   categoryListStart,
   categoryListSuccess,
   productCreateFail,
   productCreateSuccess,
   productCreateStart,
   categoryCreateStart,
   categoryCreateSuccess,
   categoryCreateFail,
   productDetailsStart,
   productDetailsSuccess,
   productDetailsFail,
   categoryDetailsFail,
   categoryDetailsSuccess,
   categoryDetailsStart,
   productDeleteStart,
   productDeleteSuccess,
   productDeleteFail,
   categoryDeleteStart,
   categoryDeleteSuccess,
   categoryDeleteFail,
   reviewListStart,
   reviewListSuccess,
   reviewListFail,
} from "../Reducers/ProductReducers";
import { URL } from "../Url";
import { logout } from "./UserActions";

export const listProduct = () => async (dispatch, getState) => {
   try {
      dispatch(productListStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`${URL}/api/products/all`, config);

      dispatch(productListSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
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

export const createProduct = (dataProduct) => async (dispatch, getState) => {
   try {
      dispatch(productCreateStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.post(
         `${URL}/api/products/`,
         dataProduct,
         config
      );

      dispatch(productCreateSuccess(data));
      return true;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(productCreateFail(err));
      return false;
   }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
   try {
      dispatch(productDeleteStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.delete(`${URL}/api/products/${id}`, config);

      dispatch(productDeleteSuccess(id));
      return true;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(productDeleteFail(err));
      return false;
   }
};

export const createCategory = (dataCategory) => async (dispatch, getState) => {
   try {
      dispatch(categoryCreateStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.post(`${URL}/api/categories/`, dataCategory, config);

      dispatch(categoryCreateSuccess());
      return true;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(categoryCreateFail(err));
      return false;
   }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
   try {
      dispatch(categoryDeleteStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.delete(`${URL}/api/categories/${id}`, config);

      dispatch(categoryDeleteSuccess(id));
      return true;
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(categoryDeleteFail(err));
      return false;
   }
};

export const getProduct = (id) => async (dispatch) => {
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

export const updateProduct =
   (id, dataProduct) => async (dispatch, getState) => {
      try {
         dispatch(productDetailsStart());

         const {
            user: { userInfo },
         } = getState();

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         };

         const { data } = await axios.put(
            `${URL}/api/products/${id}`,
            dataProduct,
            config
         );
         dispatch(productDetailsSuccess(data));
         return true;
      } catch (error) {
         const err =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message;
         dispatch(productDetailsFail(err));
         return false;
      }
   };

export const getCategory = (id) => async (dispatch) => {
   try {
      dispatch(categoryDetailsStart());
      const { data } = await axios.get(`${URL}/api/categories/${id}`);
      dispatch(categoryDetailsSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch(categoryDetailsFail(err));
   }
};

export const updateCategory =
   (id, dataCategory) => async (dispatch, getState) => {
      try {
         dispatch(categoryDetailsStart());

         const {
            user: { userInfo },
         } = getState();

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         };

         const { data } = await axios.put(
            `${URL}/api/categories/${id}`,
            dataCategory,
            config
         );
         dispatch(categoryDetailsSuccess(data));
         return true;
      } catch (error) {
         const err =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message;
         dispatch(categoryDetailsFail(err));
         return false;
      }
   };

export const listReviews = () => async (dispatch, getState) => {
   try {
      dispatch(reviewListStart());

      const {
         user: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(
         `${URL}/api/products/all/reviews`,
         config
      );

      dispatch(reviewListSuccess(data));
   } catch (error) {
      const err =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (err === "Brak autoryzacji, błąd tokena") {
         dispatch(logout());
      }
      dispatch(reviewListFail(err));
   }
};
