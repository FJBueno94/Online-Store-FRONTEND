import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GetId from '../components/GetId';
import * as api from '../services/api';

export default class CardEspecifics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetApiResult();
  }

  handleGetApiResult = async () => {
    const { superProps: { match: { params: { query, id } } } } = this.props;

    if (query.includes('MLB')) {
      const apiResult = await api.getProductsFromCategoryAndQuery(query, '');
      this.setState({ loading: true }, async () => {
        const finalApiResult = apiResult.results.find((product) => product.id === id);
        this.setState({ result: finalApiResult });
        this.setState({ loading: false });
      });
    } else {
      const apiResult = await api.getProductsFromCategoryAndQuery('', query);
      this.setState({ loading: true }, async () => {
        const finalResult = apiResult.results.find((product) => product.id === id);
        this.setState({ result: finalResult });
        this.setState({ loading: false });
      });
    }
  }

  addToCart = async () => {
    const { superProps: { match: { params: { id } } } } = this.props;
    const result = await api.getProductInfo(id);
    let alreadyInCart = JSON.parse(localStorage.getItem('cart'));
    if (alreadyInCart == null) {
      alreadyInCart = [];
    }
    let quantity = 1;
    if (alreadyInCart.some((itemInCart) => itemInCart.productName === result.title)) {
      const itemInCart = alreadyInCart.find((obj) => obj.productName === result.title);
      quantity = itemInCart.quantity + 1;
      const item = {
        productId: result.id,
        productName: result.title,
        productPrice: result.price,
        productPhoto: result.thumbnail,
        quantity,
      };
      const newCart = alreadyInCart.filter((obj) => obj.productId !== result.id);
      newCart.push(item);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      const item = {
        productId: result.id,
        productName: result.title,
        productPrice: result.price,
        productPhoto: result.thumbnail,
        quantity,
      };
      const newCart = [...alreadyInCart, item];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  render() {
    const { result, loading } = this.state;
    const { superProps: { match: { params: { query, id } } } } = this.props;
    return (
      <div>
        {loading
          ? <p>loading...</p>
          : (
            <div>
              <p data-testid="product-detail-name">{result.title}</p>
              <p>{result.price}</p>
              <img
                src={ result.thumbnail }
                alt={ result.title }
              />
              <input
                data-testid="product-detail-add-to-cart"
                type="button"
                value="Adiconar ao Carrinho"
                onClick={ this.addToCart }
              />
            </div>
          )}
        <Link
          to={ `/cardespecics/${query}/${id}` }
          data-testid="shopping-cart-button"
        />
        <Link
          to="/shopcart"
        >
          <img
            src="https://svgsilh.com/svg/294547.svg"
            alt="carrindo-compras"
            className="carrinho-img"
          />
        </Link>
        <GetId itemsInCart={ result } />
      </div>
    );
  }
}

CardEspecifics.propTypes = {
  superProps: PropTypes.object,
}.isRequired;
