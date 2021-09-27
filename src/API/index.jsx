import * as axios from 'axios';

export const authenticationApi = {
  signUp: ({ email, password }) => {
    if (email === password)
      return axios.get('/login.json').then((response) => response.data);
  },
  singIn: ({ email, password }) => {
    if (email === password && email === 'admin@mail.ru') {
      return axios
        .get('/login.json')
        .then((response) => response.data.users.admin.body);
    }
    if (email === password && email === 'user@mail.ru') {
      return axios
        .get('/login.json')
        .then((response) => response.data.users.user.body);
    } else {
      return axios.get('/none.json').then((response) => response);
    }
  }
};

export const productsApi = {
  getProducts: (limit) => {
    return axios
      .get(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((response) => response.data);
  },
  getAllProducts: () => {
    return axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => response.data);
  },
  updateUser: (data) => {
    return axios.put('users/', { data }).then((response) => response.data);
  },
  getMe: () => {
    return axios.get('users/me').then((response) => response.data);
  }
};

export const productApi = {
  getProduct: (id) => {
    return axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.data);
  },

  postNewProduct: ({ title, price, description, image, category }) => {
    return axios
      .post('https://fakestoreapi.com/products', {
        title,
        price,
        description,
        image,
        category
      })
      .then((response) => response.data);
  },
  updateProduct: ({ data, id }) => {
    return axios
      .put(`https://fakestoreapi.com/products/${id}`, { data })
      .then((response) => response.data);
  },
  deleteProduct: (id) => {
    return axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.data);
  }
};

export const categoriesApi = {
  getCategories: () => {
    return axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => response.data);
  }
};
