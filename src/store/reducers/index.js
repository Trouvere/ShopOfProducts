import ProductsReducer from './ProductsReducer';
import SpecialProductsReducer from './SpecialProductsReducer';
import ProductReducer from './ProductReducer';
import AuthReducer from './AuthReducer';
import CategoriesReducer from './CategoriesReducer';

const reducers = {
  specialProductsData: SpecialProductsReducer,
  productsData: ProductsReducer,
  productData: ProductReducer,
  authData: AuthReducer,
  categoriesData: CategoriesReducer
};

export default reducers;
