/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../../API';

const localStorageData = JSON.parse(
  window.localStorage.getItem('SpecialProducts')
);
const initialStateSet = (localData) => {
  if (localData) {
    return localData;
  }
  return {
    allSpecialProducts: []
    // status: 'idle',
    // error: null
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
      const specialProduct = action.payload.specialProduct;
      console.log("🚀 ~ file: SpecialProductsReducer.jsx ~ line 31 ~ specialProduct", specialProduct)
      const prevAllSpecialProducts = state.allSpecialProducts;
      console.log("🚀 ~ file: SpecialProductsReducer.jsx ~ line 33 ~ prevAllSpecialProducts", prevAllSpecialProducts)
      const newAllSpecialProducts = prevAllSpecialProducts.push(specialProduct);
      console.log("🚀 ~ file: SpecialProductsReducer.jsx ~ line 35 ~ newAllSpecialProducts", newAllSpecialProducts)
      state.AllSpecialProducts = newAllSpecialProducts;
    },
    resetSpecialProductsData: (state) => {
      state.allSpecialProducts = [];
    }
  }
});

export const {addSpecialProductsData, setSpecialProductsData, resetSpecialProductsData } =
  specialProductsSlice.actions;

export const setSpecialProducts = (allSpecialProducts) => async (dispatch) => {
  dispatch(setSpecialProductsData({ allSpecialProducts }));
  await window.localStorage.setItem(
    'SpecialProducts',
    JSON.stringify({
      allSpecialProducts: allSpecialProducts
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
