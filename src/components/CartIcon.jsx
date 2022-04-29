import React from 'react';
import { Link } from 'react-router-dom';
import Shopcart from '../pages/Shopcart';

export default class CartIcon extends React.Component {
  render() {
    return (
      <Link to="/shopcart" Component={ Shopcart } data-testid="shopping-cart-button">
        <img
          src="https://svgsilh.com/svg/294547.svg"
          alt="carrindo-compras"
          className="carrinho-img"
        />
        <span>0</span>
      </Link>
    );
  }
}
