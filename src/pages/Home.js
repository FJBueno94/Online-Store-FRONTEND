import React, { Component } from 'react';
import Aside from '../components/Aside';

export default class Home extends Component {
  render() {
    return (
      <div>
        <input />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Aside />
      </div>
    );
  }
}
