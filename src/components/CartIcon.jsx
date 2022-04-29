import React from 'react';
import { Link } from 'react-router-dom';
import Shopcart from '../pages/Shopcart';

export default class CartIcon extends React.Component {
  constructor() {
    super();

    this.state = { quantityOfItemsInCart: 0 };
  }

  componentDidMount() {
    const itemsInCart = JSON.parse(localStorage.getItem('cart'));
    if (itemsInCart != null) {
      let total = 0;
      console.log(itemsInCart);
      itemsInCart.forEach((item) => {
        total += item.quantity;
      });
      console.log(total);
      this.setState({ quantityOfItemsInCart: total });
    }
  }

  render() {
    const { quantityOfItemsInCart } = this.state;
    return (
      <Link to="/shopcart" Component={ Shopcart } data-testid="shopping-cart-button">
        <div className="shop_cart_icon">
          <img
            src="https://svgsilh.com/svg/294547.svg"
            alt="carrindo-compras"
            className="carrinho-img"
          />
          <span data-testid="shopping-cart-size">{quantityOfItemsInCart}</span>
        </div>
      </Link>
    );
  }
}
