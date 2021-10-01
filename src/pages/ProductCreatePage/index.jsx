/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setCategories } from '../../store/reducers/CategoriesReducer';
import Button from '../../components/Button/index';
import { refreshProductToInitialState } from '../../store/reducers/ProductReducer';
import PreloaderPage from '../../components/Preloader/Page/index';
import ProductEditBlockContainer from '../../components/ProductEditBlock/index';

import style from './styles.module.css';

const ProductCreatePage = () => {
  const dispatch = useDispatch();

  const productStatus = useSelector((state) => state.productData.status);

  const product = useSelector((state) => state.productData.currentProduct);

  useEffect(() => {
    if (productStatus !== 'idle') {
      dispatch(refreshProductToInitialState());
    }
  }, [productStatus]);

  const { categoriesDataStatus } = useSelector((state) => ({
    categoriesDataStatus: state.categoriesData.status
  }));

  useEffect(() => {
    if (categoriesDataStatus === 'idle') {
      dispatch(setCategories());
    }
  }, [categoriesDataStatus]);

  const categories = useSelector(
    (state) => state.categoriesData.categoriesData
  );

  if (categoriesDataStatus !== 'success') {
    return <PreloaderPage />;
  }

  return (
    <>
      <ProductEditBlockContainer
        product={product}
        categories={categories}
        pageDesignation="Create new product"
      />
      <div className={style.btnBlockWrapper}>
        <NavLink to="/products">
          <Button size="medium">All proucts</Button>
        </NavLink>
      </div>
    </>
  );
};

export default ProductCreatePage;
