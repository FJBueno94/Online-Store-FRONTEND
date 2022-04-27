import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class Aside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesArray: [],
    };
  }

  async componentDidMount() {
    this.setState({
      categoriesArray: await api.getCategories(),
    });
  }

  render() {
    const { categoriesArray } = this.state;
    const { handleCategoryInput } = this.props;
    return (
      <aside>
        {categoriesArray.map((category) => (
          <label
            key={ category.id }
            htmlFor={ category.id }
            data-testid="category"
          >
            { category.name }
            <input
              type="radio"
              name="radioInput"
              id={ category.id }
              onClick={ handleCategoryInput }
            />
          </label>

        ))}
      </aside>
    );
  }
}

Aside.propTypes = {
  handleCategoryInput: PropTypes.func,
}.isRequired;
