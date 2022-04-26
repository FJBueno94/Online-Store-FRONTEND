import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shopcart from './Shopcart';

export default class Home extends Component {
  render() {
    return (
      <div>
        <input id="search-input" />
        <Link to="/shopcart" Component={ Shopcart } data-testid="shopping-cart-button">
          <img
            src="https://svgsilh.com/svg/294547.svg"
            alt="carrindo-compras"
            id="arrinho-img"
          />
        </Link>
        <p data-testid="home-initial-message" id="input-search-msg">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
