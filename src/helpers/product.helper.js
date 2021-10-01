export function getCurrentISOString() {
  const date = new Date();

  return date.toISOString();
}

export function convertNewDataToProduct({ data }) {
  const { title, price, description, image, category, count, rate, published } =
    data;
  const date = new Date();
  const dateStr = date.toISOString();
  const id = parseInt(+date, 10);
  const newProduct = {
    id,
    title,
    price,
    description,
    rating: {
      count,
      rate
    },
    image,
    category,
    created: dateStr,
    modified: dateStr,
    published: published || false
  };
  return newProduct;
}

export function updateProduct({ data, oldProduct }) {
  const { title, price, description, image, category, count, rate, published } =
    data;
  const dateStr = getCurrentISOString();
  const newProduct = {
    id: oldProduct.id,
    title,
    price,
    description,
    rating: {
      count,
      rate
    },
    image,
    category,
    created: oldProduct.created,
    modified: dateStr,
    published: published || false
  };
  return newProduct;
}

export function updateArr({ data, id, arr }) {
  const newArr = arr.map((oldProduct) => {
    if (oldProduct.id === id) {
      const updatedProduct = updateProduct({ data, oldProduct });
      return updatedProduct;
    }
    return oldProduct;
  });

  return newArr;
}

export function deleteProductInArr({ id, arr }) {
  const newArr = [];
  arr.forEach((item) => {
    if (item.id === id) {
      return;
    }
    newArr.push(item);
  });

  return newArr;
}

export function addNewProductInArr({ newProduct, arr }) {
  const newArr = arr.concat(newProduct);

  return newArr;
}
export function getProductById({ id, arr }) {
  return arr.find((item) => item.id === id);
}

export function addNewProductInArrWithConvertData({ data, arr }) {
  const newProduct = convertNewDataToProduct({ data });
  const newArr = arr.concat(newProduct);

  return newArr;
}
