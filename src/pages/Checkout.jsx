import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardCheckout from '../components/cardCheckout';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      finalPrice: [],
      cart: [],
    };
  }

  componentDidMount() {
    const shopCart = JSON.parse(localStorage.getItem('cart'));
    const price = JSON.parse(localStorage.getItem('finalPrice'));

    this.setState({
      finalPrice: price,
      cart: shopCart,
    });
  }

  render() {
    const { finalPrice, cart } = this.state;
    return (
      <>
        <div>
          <h2>Revise seus produtos</h2>
          <div>
            {cart.map((e) => (
              <CardCheckout
                key={ e.productId }
                img={ e.productPhoto }
                product={ e.productName }
                price={ e.productPrice }
              />
            ))}
            <h4>{`Total = ${finalPrice}`}</h4>
          </div>
        </div>
        <div>
          <h2>Insira seus dados</h2>
          <form>
            <label htmlFor="name">
              <input
                type="text"
                className="name"
                name="nomeCompleto"
                placeholder="Nome completo:"
                data-testid="checkout-fullname"
              />
            </label>
            <label htmlFor="email">
              <input
                type="text"
                className="email"
                name="email"
                placeholder="Email"
                data-testid="checkout-email"
              />
            </label>
            <label htmlFor="cpf">
              <input
                type="text"
                className="cpf"
                name="cpf"
                placeholder="Insira seu CPF"
                data-testid="checkout-cpf"
              />
            </label>
            <label htmlFor="tel">
              <input
                type="text"
                className="tel"
                name="tel"
                placeholder="Telefone"
                data-testid="checkout-phone"
              />
            </label>
            <label htmlFor="cep">
              <input
                type="text"
                className="cep"
                name="cep"
                placeholder="CEP"
                data-testid="checkout-cep"
              />
            </label>
            <label htmlFor="endereco">
              <input
                type="text"
                className="endereco"
                name="endereco"
                placeholder="Digite seu Enderço"
                data-testid="checkout-address"
              />
            </label>
            <label htmlFor="boleto">
              Boleto
              <input type="radio" name="payment" id="boleto" value="Boleto" />
            </label>
            <label htmlFor="pix">
              Pix
              <input type="radio" name="payment" id="pix" value="Pix" />
            </label>
            <label htmlFor="credito">
              Cartão de Crédito
              <input
                type="radio"
                name="payment"
                id="credito"
                value="CartaoDeCredito"
              />
            </label>
            <label htmlFor="debito">
              Cartão de Débito
              <input type="radio" name="payment" id="debito" value="CartaoDeDebito" />
            </label>
            <Link to="/">
              <button type="button">Finalizar Compra</button>
            </Link>
          </form>
        </div>
      </>
    );
  }
}
