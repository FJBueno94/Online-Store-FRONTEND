import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GetId extends Component {
  render() {
    const { itemsInCart } = this.props;
    return (
      <div>
        {itemsInCart
        && (
          <div key={ itemsInCart.title }>
            <p data-testid="shopping-cart-product-name">{itemsInCart.title}</p>
            <p>{itemsInCart.price}</p>
            <img
              src={ itemsInCart.thumbnail }
              alt={ itemsInCart.title }
            />
            <p data-testid="shopping-cart-product-quantity">
              {itemsInCart.quantity || 1}
            </p>
          </div>
        )}
      </div>
    );
  }
}

GetId.propTypes = {
  itemsInCart: PropTypes.array,
}.isRequired;
