import React from 'react';
import { Card, Container } from 'semantic-ui-react';

import BookCard from '../../components/BookCard';

import { NavLink } from 'react-router-dom';
import Switcher from './../../components/Switcher/index';
import NavBlock from './../../components/NavComponent/index';
// import style from './styles.module.css';
// import Input from '../../components/Input';
import Button from '../../components/Button/index';

import './app.css';

const ProductsPage = ({
  productsData,
  requestProductsFotBtn,
  requestAllProductsFotBtn,
  removeProductForBtn,
  isShowPublished,
  onChangeShowPublished,
  isShowSpecialProducts
}) => {
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
  console.log('🚀 ~ file: ProductsPage.jsx ~ line 28 ~ btnBlock', btnBlock);
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
      {/* <div className={style.wrapperSearch}>

        <div className={style.wrapperSearchInput}>
          <Input
            form="oval"
            name="searchByName"
            placeholder="Find "
            // onChange={onSearchByNameChange}
            value={'searchByName'}
            // icon={searchImg}
            id="searchByName"
          />
        </div>


      </div> */}

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
