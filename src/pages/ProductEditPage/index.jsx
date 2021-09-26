/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import ProductEditBlockContainer from '../../components/ProductEditBlock/index';
import { setCategories } from '../../store/reducers/CategoriesReducer.jsx';
import DeleteModal from '../../components/DeleteModal';

import Button from '../../components/Button/index';
import {
  removeProduct,
  requestProduct,
  setSpecialProduct
} from '../../store/reducers/ProductReducer';
import PreloaderPage from '../../components/Preloader/Page/index';
import { getProductById } from './../../helpers/product.helper';

import style from './styles.module.css';

const ProductEditPage = (props) => {
  const isEditSpecialTab = window.location.href.includes('editSpecial');
  const history = useHistory();
  const dispatch = useDispatch();

  const productId = Number(
    window.location.pathname.split('/').reverse().shift()
  );
  const productStatus = useSelector((state) => state.productData.status);
  const product = useSelector((state) => state.productData.currentProduct);
  console.log(
    '🚀 ~ file: index.jsx ~ line 33 ~ ProductEditPage ~ product',
    product
  );
  const specialProductsData = useSelector(
    (state) => state.specialProductsData.allSpecialProducts
  );

  const { id, title } = product;
  useEffect(() => {
    if (
      productStatus === 'idle' ||
      (productStatus === 'success' && id !== productId)
    ) {
      if (isEditSpecialTab) {
        const data = getProductById({
          id: productId,
          arr: specialProductsData
        });
        console.log('🚀 ~ file: index.jsx ~ line 45 ~ useEffect ~ data', data);
        dispatch(setSpecialProduct(data));
      } else {
        dispatch(requestProduct(productId));
      }
    }
  }, [productStatus, id, productId, isEditSpecialTab]);

  // !
  const { categoriesDataStatus } = useSelector((state) => ({
    categoriesDataStatus: state.categoriesData.status
  }));

  useEffect(() => {
    if (categoriesDataStatus === 'idle') {
      dispatch(setCategories());
    }
  }, [categoriesDataStatus]);
  // !

  const removeProductForBtn = (id) => {
    dispatch(
      removeProduct({
        id,
        isEditSpecialTab,
        allSpecialProducts: specialProductsData
      })
    );
    history.push(`/products`);
  };

  const categories = useSelector(
    (state) => state.categoriesData.categoriesData
  );

  if (productStatus !== 'success' || categoriesDataStatus !== 'success') {
    return <PreloaderPage />;
  }

  return (
    <>
      <ProductEditBlockContainer
        product={product}
        categories={categories}
        pageDesignation={'Edit product'}
      />
      <div className={style.btnBlockWrapper}>
        <NavLink to={`/products`}>
          <Button size="medium">All proucts</Button>
        </NavLink>
        <DeleteModal
          text={`You definitely want to delete ${title}`}
          actionConfirmation={() => {
            console.log(123);
            removeProductForBtn(id);
          }}
        />
      </div>
    </>
  );
};

export default ProductEditPage;
