/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { productApi } from '../../API';
import { refreshALLProductsAfterSuccessResponse } from './ProductsReducer';
import { setSpecialProducts } from './SpecialProductsReducer';
import {
  addNewProductInArrWithConvertData,
  updateArr,
  deleteProductInArr
} from '../../helpers/product.helper';

const initialState = {
  currentProduct: {
    id: 0,
    title: '',
    price: '',
    image: '',
    description: '',
    rating: {
      count: '',
      rate: ''
    },
    category: ''
  },
  published: false,
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.status = action.payload;
    },
    postNewProduct: (state, action) => {
      state.status = action.payload;
    },
    updateProduct: (state, action) => {
      state.status = action.payload;
    },
    deleteProduct: (state, action) => {
      state.status = action.payload;
    },
    setProductSuccess: (state, action) => {
      state.currentProduct = action.payload.data;
      state.status = 'success';
    },
    refreshProduct: (state) => {
      state.currentProduct = initialState.currentProduct;
      state.status = 'idle';
    },
    setProductError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  getProduct,
  postNewProduct,
  updateProduct,
  deleteProduct,
  refreshProduct,
  setProductSuccess,
  setProductError
} = productSlice.actions;

export const requestProduct = (id) => async (dispatch) => {
  try {
    dispatch(getProduct('loading'));

    const data = await productApi.getProduct(id);
    dispatch(setProductSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get product";
    dispatch(setProductError({ error }));
  }
};

export const setSpecialProduct = (data) => async (dispatch) => {
  dispatch(getProduct('loading'));
  dispatch(setProductSuccess({ data }));
};

export const addNewProduct =
  ({ data, allSpecialProducts }) =>
  async (dispatch) => {
    try {
      dispatch(postNewProduct('loading'));

      await productApi.postNewProduct(data);

      const newArr = addNewProductInArrWithConvertData({
        data,
        arr: allSpecialProducts
      });

      dispatch(setSpecialProducts(newArr));
      dispatch(refreshProduct());
      dispatch(refreshALLProductsAfterSuccessResponse());
    } catch (error) {
      error.clientMessage = "Can't add product";
      dispatch(setProductError({ error }));
    }
  };

export const editProduct =
  ({ id, data, allSpecialProducts, isEditSpecialTab }) =>
  async (dispatch) => {
    try {
      dispatch(updateProduct('loading'));
      await productApi.updateProduct({ id, data });
      if (isEditSpecialTab) {
        const newArr = updateArr({ data, id, arr: allSpecialProducts });
        dispatch(setSpecialProducts(newArr));
      }

      dispatch(refreshProduct());
      dispatch(refreshALLProductsAfterSuccessResponse());
    } catch (error) {
      error.clientMessage = "Can't update product";
      dispatch(setProductError({ error }));
    }
  };

export const removeProduct =
  ({ id, isEditSpecialTab, allSpecialProducts }) =>
  async (dispatch) => {
    try {
      dispatch(deleteProduct('loading'));
      await productApi.deleteProduct(id);
      if (isEditSpecialTab) {
        const newArr = deleteProductInArr({ id, arr: allSpecialProducts });
        dispatch(setSpecialProducts(newArr));
      }
      dispatch(refreshProduct());
      dispatch(refreshALLProductsAfterSuccessResponse());
    } catch (error) {
      error.clientMessage = "Can't delete product";
      dispatch(setProductError({ error }));
    }
  };

export const refreshProductToInitialState = () => async (dispatch) => {
  dispatch(refreshProduct());
};

export default productSlice.reducer;
