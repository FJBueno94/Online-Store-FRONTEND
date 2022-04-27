import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aside from '../components/Aside';
import Shopcart from './Shopcart';
import Card from '../components/Card';
import * as api from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      clicked: '',
      showCard: false,
      loading: false,
      message: false,
      results: [],
    };
  }

handleInput = ({ target }) => {
  this.setState({ query: target.value });
}

handleCategoryInput = ({ target }) => {
  this.setState({ showCard: true });

  this.setState({ loading: true }, async () => {
    const apiResponse = await api.getProductsFromCategoryAndQuery(target.id, '');
    this.setState({ results: apiResponse.results });
    this.setState({ clicked: target.id });
    this.setState({ loading: false });
  });
}

handleButtonCard = () => {
  const { query, results } = this.state;

  this.setState({ showCard: true });
  this.setState({ loading: true }, async () => {
    const apiResponse = await api.getProductsFromCategoryAndQuery('none', query);
    this.setState({ results: apiResponse.results });
    this.setState({ clicked: query });
    this.setState({ loading: false });

    if (results.length === 0) {
      this.setState({ message: true });
    } else {
      this.setState({ message: false });
    }
  });
}

render() {
  const { message, query, showCard, loading, results, clicked } = this.state;
  return (
    <div>
      <Link to="/shopcart" Component={ Shopcart } data-testid="shopping-cart-button">
        <img
          src="https://svgsilh.com/svg/294547.svg"
          alt="carrindo-compras"
          className="carrinho-img"
        />
      </Link>

      <input
        id="search-input"
        value={ query }
        onChange={ this.handleInput }
        data-testid="query-input"
      />
      <button
        data-testid="query-button"
        type="button"
        onClick={ this.handleButtonCard }
      >
        Pesquisar
      </button>
      {showCard
       && <Card
         message={ message }
         loading={ loading }
         query={ results }
         clicked={ clicked }
       />}
      <p
        data-testid="home-initial-message"
        className="input-search-msg"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Aside handleCategoryInput={ this.handleCategoryInput } />
    </div>
  );
}
}
