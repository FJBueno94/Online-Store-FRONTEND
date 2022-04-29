import * as api from './api';

export default async function addToCart(id) {
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
