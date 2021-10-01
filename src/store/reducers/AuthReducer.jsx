/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const localStorageData = JSON.parse(window.localStorage.getItem('authData'));

const initialStateSet = (localData) => {
  if (localData) {
    return localData;
  }
  return {
    isAuth: false,
    email: '',
    token: '',
    id: ''
  };
};
const initialState = initialStateSet(localStorageData);

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    resetAuthData: (state) => {
      state.email = '';
      state.token = '';
      state.isAuth = false;
      window.localStorage.setItem(
        'authData',
        JSON.stringify({
          email: '',
          isAuth: false,
          token: ''
        })
      );
    }
  }
});

export const { setAuthData, resetAuthData } = authSlice.actions;

export const resetAuthentication = () => (dispatch) => {
  dispatch(resetAuthData());
};

export default authSlice.reducer;
