import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestProducts,
  requestAllProducts
} from '../../store/reducers/ProductsReducer.jsx';
import { removeProduct } from '../../store/reducers/ProductReducer.jsx';
import PreloaderPage from '../../components/Preloader/Page';
import ProductsPage from './ProductsPage';
import { setCategories } from '../../store/reducers/CategoriesReducer.jsx';

const ProductsPageContainer = ({ isShowSpecialProducts }) => {
  const [isShowPublished, setShowPublished] = useState(false);

  const [searchByTitle, setSearchByTitle] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');

  const searchItems = (items) => {
    let filterProducts = items;
    if (searchByTitle.length !== 0) {
      const searchByTitleLowerCase = searchByTitle.toLowerCase();
      filterProducts = filterProducts.filter((item) => {
        if (item.title) {
          return item.title.toLowerCase().includes(searchByTitleLowerCase);
        }
        return false;
      });
    }
    if (searchByCategory.length !== 0 && searchByCategory !== 'All categories') {
      const searchByCategoryLowerCase = searchByCategory.toLowerCase();
      filterProducts = filterProducts.filter((item) => {
        if (item.category) {
          return item.category
            .toLowerCase()
            .includes(searchByCategoryLowerCase);
        }
        return false;
      });
    }


    if (isShowSpecialProducts) {
      filterProducts = isShowPublished
        ? filterProducts.filter((product) => product.published)
        : filterProducts.filter((product) => !product.published);
    }

    return filterProducts;
  };

  const dispatch = useDispatch();
  const productsStatus = useSelector((state) => state.productsData.status);

  const productsData = useSelector((state) => state.productsData.allProducts);
  const specialProductsData = useSelector(
    (state) => state.specialProductsData.allSpecialProducts
  );

  const products = isShowSpecialProducts ? specialProductsData : productsData;

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(requestProducts());
    }
  }, [productsStatus]);


  
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

  if (productsStatus === 'success' && categoriesDataStatus === 'success') {
    return (
      <ProductsPage
        productsData={searchItems(products)}
        requestProductsFotBtn={requestProductsFotBtn}
        requestAllProductsFotBtn={requestAllProductsFotBtn}
        removeProductForBtn={removeProductForBtn}
        isShowPublished={isShowPublished}
        onChangeShowPublished={onChangeShowPublished}
        isShowSpecialProducts={isShowSpecialProducts}
        searchByTitle={searchByTitle}
        setSearchByTitle={setSearchByTitle}
        searchByCategory={searchByCategory}
        setSearchByCategory={setSearchByCategory}
        categories={categories}
      />
    );
    // }
  }

  return <PreloaderPage />;
};

export default ProductsPageContainer;
