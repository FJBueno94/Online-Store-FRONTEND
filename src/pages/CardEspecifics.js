import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import addToCart from '../services/addToCart';
import cartItemsCount from '../services/manageCartCount';
import CartIcon from '../components/CartIcon';

export default class CardEspecifics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {},
      loading: false,
      email: '',
      review: '',
      comment: '',
      savedReviews: [],
      quantityOfItemsInCart: 0,
    };
  }

  async componentDidMount() {
    const total = cartItemsCount();
    this.setState({ quantityOfItemsInCart: total });
    // this.newfunc();
    await this.handleGetApiResult();
    const { result } = this.state;
    const local = JSON.parse(localStorage.getItem(result.id));
    if (local) {
      this.setState({
        savedReviews: local,
      });
    }
  }

  reviewEvent = () => {
    const {
      email,
      review,
      comment,
      result,
    } = this.state;

    const newReview = {
      email,
      review,
      comment,
    };

    this.setState((prevState) => ({
      savedReviews: [...prevState.savedReviews, newReview],
      email: '',
      review: '',
      comment: '',
    }), () => {
      const { savedReviews } = this.state;
      localStorage.setItem(result.id, JSON.stringify(savedReviews));
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
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
    const { result } = this.state;
    await addToCart(result);
    const total = cartItemsCount();
    this.setState({ quantityOfItemsInCart: total });
    // this.newfunc();
  }

  render() {
    const {
      result,
      loading,
      email,
      review,
      comment,
      savedReviews,
      quantityOfItemsInCart,
    } = this.state;
    const grade = ['1', '2', '3', '4', '5'];
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
        <CartIcon quantity={ quantityOfItemsInCart } />
        <div>
          <form>
            <h2>Avaliações</h2>
            <label htmlFor="email-input">
              Email:
              <input
                type="text"
                name="email"
                value={ email }
                id="email-input"
                placeholder="Insira seu email"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
              />
            </label>
            {
              grade.map((e, i) => (
                <label htmlFor={ Number(i) } key={ Number(e) }>
                  {Number(e)}
                  <input
                    type="radio"
                    name="review"
                    id={ Number(e) }
                    value={ review }
                    data-testid={ `${Number(e)}-rating` }
                    onChange={ this.handleChange }
                  />
                </label>
              ))
            }
            <br />
            <label htmlFor="comment">
              <textarea
                name="comment"
                id="comment"
                value={ comment }
                data-testid="product-detail-evaluation"
                placeholder="Adicione um comentário"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.reviewEvent }
            >
              Avaliar
            </button>
          </form>
        </div>
        {
          savedReviews.map((e, i) => (
            <div key={ i }>
              <p key={ e.email }>{ e.email }</p>
              {
                grade.map((el) => (
                  <label htmlFor={ Number(i) } key={ Number(el) }>
                    {Number(el)}
                    <input
                      type="radio"
                      name="review"
                      id={ Number(i) }
                      value={ el }
                      checked={ el === e.review }
                      disabled
                      data-testid={ `${Number(el)}-rating` }
                      onChange={ this.handleChange }
                    />
                  </label>
                ))
              }
              <p>{ e.comment }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

CardEspecifics.propTypes = {
  superProps: PropTypes.object,
}.isRequired;
