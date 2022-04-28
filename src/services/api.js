export async function getCategories() {
  // Implemente aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await fetch(url);
  const response = await data.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // fix Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe

  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const data = await fetch(url);
  const response = await data.json();

  return response;
}

export async function getProductInfo(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  if (productId !== undefined) {
    const data = await fetch(url);
    const response = await data.json();

    return response;
  }
  throw new Error('You must provide an url.');
}
