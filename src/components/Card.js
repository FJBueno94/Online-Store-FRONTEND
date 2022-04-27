import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { query, loading, message } = this.props;
    return (
      <div>
        {loading
          ? <p>carregando...</p>
          : (
            <div>
              {
                query.map((product) => (
                  <div
                    data-testid="product"
                    key={ product.id }
                  >
                    <p>{product.title}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{product.price}</p>
                  </div>
                ))
              }
              {message && <p>Nenhum produto foi encontrado</p>}
            </div>
          )}
      </div>
    );
  }
}

Card.propTypes = {
  query: PropTypes.string,
}.isRequired;
