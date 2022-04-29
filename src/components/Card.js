import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleClick = async ({ target }) => {
    const result = await api.getProductInfo(target.value);
    console.log(result);
  }

  render() {
    const { query, loading, message, clicked } = this.props;
    return (
      <div>
        {loading ? (
          <p>carregando...</p>
        ) : (
          <div>
            {query.map((product, i) => (
              <>
                <Link
                  key={ i }
                  to={ `/cardespecics/${clicked}/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product" key={ product.id }>
                    <p>{product.title}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{product.price}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ this.handleClick }
                  value={ product.id }
                >
                  Adicionar ao Carrinho
                </button>
              </>
            ))}
            {message && <p>Nenhum produto foi encontrado</p>}
          </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  query: PropTypes.string,
  loading: PropTypes.bool,
  message: PropTypes.bool,
  clicked: PropTypes.string,
}.isRequired;
