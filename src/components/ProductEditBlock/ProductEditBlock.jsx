import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

import {
  InputForFormik,
  TextareaForFormik,
  SelectForFormik
} from '../ForFormik';
import SwitcheForFormik from '../SwitcheForFormik/index';

const ProductEditBlock = ({ avatar, categories }) => {
  return (
    <div className={style.productEditBlock}>
      {' '}
      <div className={style.avatarBlock}>
        {' '}
        {avatar ? (
          <img className={style.avatar} src={avatar} alt="img" />
        ) : (
          <div className={style.notAvatar} />
        )}
      </div>
      <div className={style.leftBlock}>
        <InputForFormik placeholder="title" name="title" label="title" />
        <TextareaForFormik
          placeholder="descriptione"
          name="description"
          label="description"
        />
        <InputForFormik placeholder="image" name="image" label="image" />
      </div>
      <div className={style.rightBlock}>
        {/* <div className={style.inputBlock}> */}
        <InputForFormik
          placeholder="rate"
          name="rate"
          label="rate"
          type="number"
        />
        <InputForFormik
          placeholder="count"
          name="count"
          label="count"
          type="number"
        />

        <InputForFormik
          placeholder="price"
          name="price"
          label="price"
          type="number"
        />

        <SelectForFormik
          name="category"
          options={categories}
          label="Category"
        />
        <SwitcheForFormik
          name="published"
          labelChecked="Published"
          labelUnchecked="Unpublished"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductEditBlock;

ProductEditBlock.propTypes = {
  avatar: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string)
};
ProductEditBlock.defaultProps = {
  avatar: '',
  categories: []
};
