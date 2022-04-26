import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message" className="empty-cart-msg">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}
