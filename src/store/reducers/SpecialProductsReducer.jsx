/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const localStorageData = JSON.parse(
  window.localStorage.getItem('SpecialProducts')
);
const initialStateSet = (localData) => {
  if (localData) {
    return localData;
  }
  return {
    allSpecialProducts: []
  };
};
const initialState = initialStateSet(localStorageData);

// !!!!!!!!!

const specialProductsSlice = createSlice({
  name: 'specialProductsData',
  initialState,
  reducers: {
    setSpecialProductsData: (state, action) => {
      state.allSpecialProducts = action.payload.allSpecialProducts;
    },
    addSpecialProductsData: (state, action) => {
      const { specialProduct } = action.payload;

      const prevAllSpecialProducts = state.allSpecialProducts;

      const newAllSpecialProducts = prevAllSpecialProducts.push(specialProduct);

      state.AllSpecialProducts = newAllSpecialProducts;
    },
    resetSpecialProductsData: (state) => {
      state.allSpecialProducts = [];
    }
  }
});

export const {
  addSpecialProductsData,
  setSpecialProductsData,
  resetSpecialProductsData
} = specialProductsSlice.actions;

export const setSpecialProducts = (allSpecialProducts) => async (dispatch) => {
  dispatch(setSpecialProductsData({ allSpecialProducts }));
  await window.localStorage.setItem(
    'SpecialProducts',
    JSON.stringify({
      allSpecialProducts
    })
  );
};
export const addSpecialProducts = (specialProduct) => async (dispatch) => {
  dispatch(addSpecialProductsData({ specialProduct }));
  // await window.localStorage.setItem(
  //   'SpecialProducts',
  //   JSON.stringify({
  //     allSpecialProducts: allSpecialProducts
  //   })
  // );
};
export const resetSpecialProducts = () => async (dispatch) => {
  dispatch(resetSpecialProductsData());
  await window.localStorage.setItem(
    'SpecialProducts',
    JSON.stringify({
      allSpecialProducts: []
    })
  );
};

export default specialProductsSlice.reducer;
