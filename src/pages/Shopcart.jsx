import React, { Component } from 'react';
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

    return (
      <div>
        {itemsInCart.length === 0 ? emptyMessage : cart}
        {finalPrice.toFixed(2)}
      </div>
    );
  }
}
