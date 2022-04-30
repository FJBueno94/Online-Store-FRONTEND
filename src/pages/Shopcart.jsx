import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Buttons from '../components/Buttons';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: [],
      finalPrice: 0,
    };
  }

  componentDidMount() {
    const itemsInCart = JSON.parse(localStorage.getItem('cart'));
    if (itemsInCart == null) {
      console.log('itemsInCart é null');
    } else this.setState({ itemsInCart });
    this.handleFinalPrice();
  }

  handleFinalPrice = () => {
    const LocalStorageCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const finalPrice = LocalStorageCartItems.map(
      (item) => item.productPrice * item.quantity,
    ).reduce((a, b) => a + b, 0);

    this.setState({ finalPrice });
  }

  render() {
    const { itemsInCart, finalPrice } = this.state;

    const emptyMessage = (
      <p
        data-testid="shopping-cart-empty-message"
        className="empty-cart-msg"
      >
        Seu carrinho está vazio

      </p>);

    const cart = itemsInCart.map((item) => (
      <div key={ item.productName } id={ item.productId }>
        <p data-testid="shopping-cart-product-name">{item.productName}</p>
        <img
          src={ item.productPhoto }
          alt={ item.productName }
        />
        <Buttons
          arr={ itemsInCart }
          quantity={ item.quantity }
          price={ item.productPrice }
          handleFinalPrice={ this.handleFinalPrice }
        />
      </div>
    ));

    localStorage.setItem('finalPrice', JSON.stringify(finalPrice));

    return (
      <div>
        {itemsInCart.length === 0 ? emptyMessage : cart}
        {finalPrice.toFixed(2)}
        <br />
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    );
  }
}
