import React, { Component } from 'react';
// import * as api from '../services/api';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: [],
      // itemsInfos: [],
    };
  }

  componentDidMount() {
    const itemsInCart = JSON.parse(localStorage.getItem('cart'));
    if (itemsInCart == null) {
      console.log('itemsInCart é null');
    } else this.setState({ itemsInCart });
  }

  render() {
    const { itemsInCart } = this.state;

    const emptyMessage = (
      <p
        data-testid="shopping-cart-empty-message"
        className="empty-cart-msg"
      >
        Seu carrinho está vazio

      </p>);

    const cart = itemsInCart.map((item) => (
      <div key={ item.productName }>
        <p data-testid="shopping-cart-product-name">{item.productName}</p>
        <p>{item.productPrice}</p>
        <img
          src={ item.productPhoto }
          alt={ item.productName }
        />
        <p data-testid="shopping-cart-product-quantity">
          Quantidade
          {item.quantity}
        </p>
      </div>
    ));

    return (
      <div>
        {itemsInCart.length === 0 ? emptyMessage : cart}
      </div>
    );
  }
}
