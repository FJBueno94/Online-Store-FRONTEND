import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { result, loading } = this.state;
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
            </div>
          )}
      </div>
    );
  }
}

CardEspecifics.propTypes = {
  superProps: PropTypes.object,
}.isRequired;
