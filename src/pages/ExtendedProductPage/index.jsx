import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Card, Image, Icon, Button } from 'semantic-ui-react';
import { Grid, Header, Segment, Rating } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { requestProduct } from '../../store/reducers/ProductReducer.jsx';
import PreloaderPage from '../../components/Preloader/Page/index';

const ExtendedProductPage = (props) => {
  const dispatch = useDispatch();

  const productId = Number(
    window.location.pathname.split('/').reverse().shift()
  );

  const productStatus = useSelector((state) => state.productData.status);

  const product = useSelector((state) => state.productData.currentProduct);

  const { id, title, price, image, description, rating, category } = product;

  const { count, rate } = rating;

  useEffect(() => {
    if (
      productStatus === 'idle' ||
      (productStatus === 'success' && id !== productId)
    ) {
      dispatch(requestProduct(productId));
    }
  }, [productStatus, id, productId]);

  if (productStatus !== 'success') {
    return <PreloaderPage/>;
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
                  {count} feedbacks
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
              <NavLink to={`/products`}>
                <Button size="huge">All proucts</Button>
              </NavLink>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default ExtendedProductPage;
