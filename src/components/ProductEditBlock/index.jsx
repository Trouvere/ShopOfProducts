import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import style from './styles.module.css';
import {
  editProduct,
  addNewProduct
} from '../../store/reducers/ProductReducer';
import { inputForFromikValidation } from '../../plugins/validation';
import ProductEditBlock from './ProductEditBlock';

const ProductEditBlockContainer = ({
  categories,
  product,
  pageDesignation
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const allSpecialProducts = useSelector(
    (state) => state.specialProductsData.allSpecialProducts
  );
  const { id, title, price, image, description, rating, category, published } =
    product;

  const { count, rate } = rating;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: title || '',
          price: price || 0,
          image: image || '',
          description: description || '',
          count: count || 0,
          rate: rate || 0,
          published: published || false,
          category: category || categories[0]
        }}
        validationSchema={inputForFromikValidation}
        onSubmit={async (data) => {
          const isCreateTab = window.location.href.includes('create');
          const isEditSpecialTab = window.location.href.includes('editSpecial');
          if (isCreateTab) {
            dispatch(addNewProduct({ data, allSpecialProducts }));
          } else {
            dispatch(
              editProduct({ id, data, allSpecialProducts, isEditSpecialTab })
            );
          }
          history.push('/products');
        }}
      >
        {() => (
          <Form>
            <h4 className={style.pageDesignation}>{pageDesignation}</h4>
            <ProductEditBlock avatar={image} categories={categories} />
            <div className={style.submitBtnWrapper}>
              <button type="submit" className={style.submitBtn}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

ProductEditBlockContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  product: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.shape({
      count: PropTypes.number,
      rate: PropTypes.number
    }),
    category: PropTypes.string,
    published: PropTypes.bool
  }).isRequired,
  pageDesignation: PropTypes.string
};
ProductEditBlockContainer.defaultProps = {
  categories: [],
  pageDesignation: ''
};

export default ProductEditBlockContainer;
