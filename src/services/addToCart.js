export default async function addToCart(result) {
  let alreadyInCart = JSON.parse(localStorage.getItem('cart'));
  if (alreadyInCart == null) {
    alreadyInCart = [];
  }
  let quantity = 1;
  if (alreadyInCart.some((itemInCart) => itemInCart.productName === result.title)) {
    const itemInCart = alreadyInCart.find((obj) => obj.productName === result.title);
    quantity = itemInCart.quantity + 1;
    const item = {
      productName: result.title,
      productPrice: result.price,
      productId: result.id,
      productPhoto: result.thumbnail,
      quantity,
      ProductAvailability: result.available_quantity,
    };
    const newCart = alreadyInCart.filter((obj) => obj.productId !== result.id);
    newCart.push(item);
    localStorage.setItem('cart', JSON.stringify(newCart));
  } else {
    const item = {
      productPhoto: result.thumbnail,
      productId: result.id,
      productName: result.title,
      productPrice: result.price,
      quantity,
      ProductAvailability: result.available_quantity,
    };
    const newCart = [...alreadyInCart, item];
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
}
