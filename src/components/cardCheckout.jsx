import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardCheckout extends Component {
  render() {
    const {
      img,
      product,
      price,
    } = this.props;

    return (
      <div>
        <h4>{ product }</h4>
        <img src={ img } alt={ product } />
        <p>{`R$ ${price}`}</p>
      </div>
    );
  }
}

CardCheckout.propTypes = {
  img: PropTypes.string,
  product: PropTypes.string,
  price: PropTypes.number,
}.isRequired;
