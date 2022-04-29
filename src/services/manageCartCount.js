export default function cartItemsCount() {
  const itemsInCart = JSON.parse(localStorage.getItem('cart'));
  let total = 0;
  if (itemsInCart != null) {
    console.log(itemsInCart);
    itemsInCart.forEach((item) => {
      total += item.quantity;
    });
  }
  return total;
}
