import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getUserProfile } from '../../store/reducers/UserReducer';
import {
  requestProducts,
  requestAllProducts
} from '../../store/reducers/ProductsReducer.jsx';
import { removeProduct } from '../../store/reducers/ProductReducer.jsx';
import PreloaderPage from '../../components/Preloader/Page';
import ProductsPage from './ProductsPage';

const ProductsPageContainer = ({ isShowSpecialProducts }) => {
  const [isShowPublished, setShowPublished] = useState(false);

  const dispatch = useDispatch();
  const productsStatus = useSelector((state) => state.productsData.status);

  const productsData = useSelector((state) => state.productsData.allProducts);
  const specialProductsData = useSelector(
    (state) => state.specialProductsData.allSpecialProducts
  );

  const products = isShowSpecialProducts ? specialProductsData : productsData;

  // sort unpublished
  let filtetPublished;
  if (isShowSpecialProducts) {
    filtetPublished = isShowPublished
      ? products.filter((product) => product.published)
      : products.filter((product) => !product.published);
  } else {
    filtetPublished = products;
  }

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(requestProducts());
    }
  }, [productsStatus]);

  const requestProductsFotBtn = (limit) => {
    dispatch(requestProducts(limit));
  };

  const requestAllProductsFotBtn = () => {
    dispatch(requestAllProducts());
  };

  const removeProductForBtn = (id) => {
    dispatch(
      removeProduct({
        id,
        isEditSpecialTab: isShowSpecialProducts,
        allSpecialProducts: specialProductsData
      })
    );
  };
  const onChangeShowPublished = (e) => {
    setShowPublished(!isShowPublished);
  };

  if (productsStatus === 'success') {
    return (
      <ProductsPage
        productsData={filtetPublished}
        requestProductsFotBtn={requestProductsFotBtn}
        requestAllProductsFotBtn={requestAllProductsFotBtn}
        removeProductForBtn={removeProductForBtn}
        isShowPublished={isShowPublished}
        onChangeShowPublished={onChangeShowPublished}
        isShowSpecialProducts={isShowSpecialProducts}
      />
    );
    // }
  }

  return <PreloaderPage />;
};

export default ProductsPageContainer;
