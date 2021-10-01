/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../../API';

const initialState = {
  allProducts: [],
  status: 'idle',
  error: null
};

const productsSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setProductsStatus: (state, action) => {
      state.status = action.payload;
    },
    setProductsSuccess: (state, action) => {
      state.allProducts = action.payload.data;
      state.status = 'success';
    },
    setProductsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    },
    refreshALLProductsAfterSuccessResponse: (state) => {
      state.allProducts = initialState.allProducts;
      state.status = 'idle';
    }
  }
});

export const {
  setProductsError,
  setProductsSuccess,
  setProductsStatus,
  refreshALLProductsAfterSuccessResponse
} = productsSlice.actions;

export const requestProducts =
  (limit = 8) =>
  async (dispatch) => {
    try {
      dispatch(setProductsStatus('loading'));
      const data = await productsApi.getProducts(limit);
      dispatch(setProductsSuccess({ data }));
    } catch (error) {
      error.clientMessage = "Can't get products";
      dispatch(setProductsError({ error }));
    }
  };

export const requestAllProducts = () => async (dispatch) => {
  try {
    dispatch(setProductsStatus('loading'));
    const data = await productsApi.getAllProducts();
    dispatch(setProductsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get products";
    dispatch(setProductsError({ error }));
  }
};

export default productsSlice.reducer;
