/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { categoriesApi } from '../../API';

const initialState = {
  categoriesData: [],
  status: 'idle',
  error: null
};

const categoriesSlice = createSlice({
  name: 'categoriesData',
  initialState,
  reducers: {
    setCategoriesStatus: (state, action) => {
      state.status = action.payload;
    },
    setCategoriesSuccess: (state, action) => {
      state.categoriesData = action.payload.data;
      state.status = 'success';
    },
    setCategoriesError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const { setCategoriesError, setCategoriesSuccess, setCategoriesStatus } =
  categoriesSlice.actions;

export const setCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoriesStatus('loading'));
    const data = await categoriesApi.getCategories();
    dispatch(setCategoriesSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get role in the company";
    dispatch(setCategoriesError({ error }));
  }
};

export default categoriesSlice.reducer;
