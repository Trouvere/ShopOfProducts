/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import DeleteModal from './DeleteModal';
import Button from './Button/index';

const BookCard = (book) => {
  const {
    title,
    price,
    image,
    removeProductForBtn,
    id,
    isShowSpecialProducts
  } = book;
  return (
    <Card>
      <div className="card-image">
        <Image src={image} centered verticalAlign="middle" />
      </div>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="dollar" />
          {price}
        </a>
      </Card.Content>

      {isShowSpecialProducts && (
        <NavLink to={`/productsSpecial/${id}`}>
          <Button>View</Button>
        </NavLink>
      )}
      {!isShowSpecialProducts && (
        <NavLink to={`/products/${id}`}>
          <Button>View</Button>
        </NavLink>
      )}
      {isShowSpecialProducts && (
        <NavLink to={`/editSpecial/${id}`}>
          <Button>Edit</Button>
        </NavLink>
      )}
      {!isShowSpecialProducts && (
        <NavLink to={`/edit/${id}`}>
          <Button>Edit</Button>
        </NavLink>
      )}
      <DeleteModal
        text={`You definitely want to delete ${title}`}
        actionConfirmation={() => {
          removeProductForBtn(id);
        }}
      />
    </Card>
  );
};

export default BookCard;
