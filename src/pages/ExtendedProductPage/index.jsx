/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Image,
  Icon,
  Button,
  Grid,
  Header,
  Segment,
  Rating
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  requestProduct,
  setSpecialProduct
} from '../../store/reducers/ProductReducer';
import PreloaderPage from '../../components/Preloader/Page/index';
import { getProductById } from '../../helpers/product.helper';

const ExtendedProductPage = ({ isShowSpecialProducts }) => {
  const dispatch = useDispatch();

  const productId = Number(
    window.location.pathname.split('/').reverse().shift()
  );

  const productStatus = useSelector((state) => state.productData.status);

  const product = useSelector((state) => state.productData.currentProduct);
  const specialProductsData = useSelector(
    (state) => state.specialProductsData.allSpecialProducts
  );

  const { id, title, price, image, description, rating, category } = product;

  const { count, rate } = rating;

  useEffect(() => {
    if (
      productStatus === 'idle' ||
      (productStatus === 'success' && id !== productId)
    ) {
      if (isShowSpecialProducts) {
        const data = getProductById({
          id: productId,
          arr: specialProductsData
        });
        dispatch(setSpecialProduct(data));
      } else {
        dispatch(requestProduct(productId));
      }
    }
  }, [productStatus, id, productId, isShowSpecialProducts]);

  if (productStatus !== 'success') {
    return <PreloaderPage />;
  }
  return (
    <Container className="container">
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={6}>
              <div className="card-image">
                <Image src={image} centered verticalAlign="middle" />
              </div>
            </Grid.Column>
            <Grid.Column floated="right" width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                {title}
              </Header>
              <div className="card-Rating">
                <Rating defaultRating={rate} maxRating={5} disabled />
                <a>
                  <Icon name="user" />
                  {count}
                  feedbacks
                </a>
              </div>
              <p>
                <Icon name="dollar" />
                {price}
              </p>
              <p style={{ fontSize: '1.33em' }}>{category}</p>
              <p style={{ fontSize: '1.33em' }}>{description}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <NavLink to="/products">
                <Button size="huge">All proucts</Button>
              </NavLink>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

ExtendedProductPage.propTypes = {
  isShowSpecialProducts: PropTypes.bool
};
ExtendedProductPage.defaultProps = {
  isShowSpecialProducts: false
};

export default ExtendedProductPage;
