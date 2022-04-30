import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityState: props.quantity,
      total: props.price * props.quantity,
    };
  }

    handleAddition = ({ target }) => {
      const { price, arr, handleFinalPrice } = this.props;
      const { quantityState } = this.state;
      this.setState((prevState) => ({ quantityState: prevState.quantityState + 1,
        total: prevState.total + price }));

      const { id } = target.parentElement.parentElement;
      const itemFromCart = arr.find((item) => item.productId === id);

      itemFromCart.quantity = quantityState + 1;
      if (itemFromCart.quantity === 0) {
        itemFromCart.quantity = 1;
      }
      localStorage.setItem('cart', JSON.stringify(arr));

      handleFinalPrice();
    }

    handleSubtraction = ({ target }) => {
      const { quantityState } = this.state;
      const { price, arr, handleFinalPrice } = this.props;
      if (quantityState > 1) {
        this.setState((prevState) => ({ quantityState: prevState.quantityState - 1,
          total: prevState.total - price }));
      }

      const { id } = target.parentElement.parentElement;
      const itemFromCart = arr.find((item) => item.productId === id);

      itemFromCart.quantity = quantityState - 1;
      if (itemFromCart.quantity === 0) {
        itemFromCart.quantity = 1;
      }
      localStorage.setItem('cart', JSON.stringify(arr));

      handleFinalPrice();
    }

    handleDelete = ({ target }) => {
      const { handleFinalPrice } = this.props;
      const LocalStorageCartItem = JSON.parse(localStorage.getItem('cart')) || [];
      const { id } = target.parentElement.parentElement;
      const newLocalStorageCartItem = LocalStorageCartItem.filter(
        (item) => item.productId !== id,
      );
      localStorage.setItem('cart', JSON.stringify(newLocalStorageCartItem));
      target.parentElement.parentElement.remove();

      handleFinalPrice();
    }

    render() {
      const { quantityState, total } = this.state;
      return (
        <div>
          <button
            type="button"
            onClick={ this.handleSubtraction }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
          <p
            data-testid="shopping-cart-product-quantity"
          >
            { quantityState }
          </p>
          <button
            type="button"
            onClick={ this.handleAddition }
            data-testid="product-increase-quantity"
          >
            +
          </button>
          <p>{total.toFixed(2)}</p>
          <button
            type="button"
            onClick={ this.handleDelete }
          >
            X
          </button>
        </div>
      );
    }
}

Buttons.propTypes = {
  quantity: PropTypes.number,
  total: PropTypes.number,
}.isRequired;
