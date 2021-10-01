import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BookCard from '../../components/BookCard';

import Switcher from '../../components/Switcher/index';
import NavBlock from '../../components/NavComponent/index';
import style from './styles.module.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button/index';
import searchImg from '../../assets/img/icons/search.svg';

import './app.css';

const ProductsPage = ({
  products,
  requestProductsFotBtn,
  requestAllProductsFotBtn,
  removeProductForBtn,
  isShowPublished,
  onChangeShowPublished,
  isShowSpecialProducts,
  searchByTitle,
  setSearchByTitle,
  searchByCategory,
  setSearchByCategory,
  categories
}) => {
  const onSearchByTitleChange = (e) => {
    setSearchByTitle(e.target.value);
  };
  const onSearchByCategoryChange = (e) => {
    setSearchByCategory(e.target.value);
  };
  let btnBlock;
  if (!isShowSpecialProducts) {
    btnBlock = (
      <>
        <Button onClick={() => requestProductsFotBtn(8)}>8 products</Button>
        <Button onClick={() => requestProductsFotBtn(16)}>16 products</Button>
        <Button onClick={() => requestAllProductsFotBtn()}>All products</Button>
      </>
    );
  }

  return (
    <Container className="container">
      <div className="btn-group">
        <NavBlock />
        <Switcher
          name="published"
          labelChecked="Show published"
          labelUnchecked="Show unpublished"
          checked={isShowPublished}
          onChange={onChangeShowPublished}
        />
      </div>
      <div className="btn-group">
        {btnBlock}

        <NavLink to="/products/create">
          <Button size="medium">create</Button>
        </NavLink>
      </div>
      <div className={style.wrapperSearch}>
        <div className={style.wrapperSearchInput}>
          <Input
            form="oval"
            name="searchByTitle"
            placeholder="Find "
            onChange={onSearchByTitleChange}
            value={searchByTitle}
            icon={searchImg}
            id="searchByTitle"
          />
        </div>
        <div className={style.wrapperSearchInput}>
          <Select
            name="searchByCategory"
            placeholder="All categories"
            onChange={onSearchByCategoryChange}
            value={searchByCategory}
            icon={searchImg}
            options={categories}
            id="searchByLocation"
          />
        </div>
      </div>

      <Card.Group itemsPerRow={4}>
        {products.map((book) => (
          <BookCard
            key={book.title}
            removeProductForBtn={removeProductForBtn}
            isShowSpecialProducts={isShowSpecialProducts}
            {...book}
          />
        ))}
      </Card.Group>
    </Container>
  );
};

ProductsPage.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  requestProductsFotBtn: PropTypes.func,
  requestAllProductsFotBtn: PropTypes.func,
  removeProductForBtn: PropTypes.func,
  isShowPublished: PropTypes.bool.isRequired,
  onChangeShowPublished: PropTypes.func,
  isShowSpecialProducts: PropTypes.bool.isRequired,
  searchByTitle: PropTypes.string,
  setSearchByTitle: PropTypes.func,
  searchByCategory: PropTypes.string,
  setSearchByCategory: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string)
};

ProductsPage.defaultProps = {
  categories: [],
  requestProductsFotBtn: () => {},
  requestAllProductsFotBtn: () => {},
  removeProductForBtn: () => {},
  onChangeShowPublished: () => {},
  searchByTitle: '',
  setSearchByTitle: () => {},
  searchByCategory: '',
  setSearchByCategory: () => {}
};
export default ProductsPage;
