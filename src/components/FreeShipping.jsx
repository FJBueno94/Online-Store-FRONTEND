import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FreeShipping extends Component {
  render() {
    const { headline } = this.props;
    return (
      <p>
        {headline.shipping?.free_shipping && (
          <p data-testid="free-shipping"> frete grátis </p>
        )}
      </p>
    );
  }
}

FreeShipping.propTypes = {
  headline: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FreeShipping;

//* Consultei o site: https://stackoverflow.com/questions/70611388/render-a-nested-object-from-api-type-error-cannot-read-properties-of-undefine
// Para entender como resolver um erro na demora da api com o uso de encadeamento opicional
//*
