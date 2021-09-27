import React from 'react';
import { Card, Container } from 'semantic-ui-react';

import BookCard from '../../components/BookCard';

import { NavLink } from 'react-router-dom';
import Switcher from './../../components/Switcher/index';
import NavBlock from './../../components/NavComponent/index';
import style from './styles.module.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button/index';
import searchImg from '../../assets/img/icons/search.svg';

import './app.css';

const ProductsPage = ({
  productsData,
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

        <NavLink to={`/products/create`}>
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
        {productsData.map((book, i) => (
          <BookCard
            key={i}
            removeProductForBtn={removeProductForBtn}
            isShowSpecialProducts={isShowSpecialProducts}
            {...book}
          />
        ))}
      </Card.Group>
    </Container>
  );
};

export default ProductsPage;
