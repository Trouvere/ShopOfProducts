import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import ProductEditPage from './pages/ProductEditPage';
import ProductCreatePage from './pages/ProductCreatePage';
import Preview from './pages/Preview';
// import Footer from './pages/Footer';
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ExtendedProductPage from './pages/ExtendedProductPage';

import './App.css';

function App() {
  const isAuth = useSelector((state) => state.authData.isAuth);
  return (
    <BrowserRouter>
      <Header />
      <div className="contentWrapper">
        <Switch>
          <ProtectedRoute
            exact
            isAuth={isAuth}
            path="/products"
            isShowSpecialProducts={false}
            component={ProductsPage}
          />
          <ProtectedRoute
            exact
            isAuth={isAuth}
            path="/productsSpecial"
            isShowSpecialProducts
            component={ProductsPage}
          />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route exact path="/" render={() => <Preview />} />
          <ProtectedRoute
            isAuth={isAuth}
            exact
            path="/editSpecial/:productId"
            component={ProductEditPage}
          />
          <ProtectedRoute
            isAuth={isAuth}
            exact
            path="/edit/:productId"
            component={ProductEditPage}
          />
          <ProtectedRoute
            isAuth={isAuth}
            path="/products/create"
            component={ProductCreatePage}
          />
          <ProtectedRoute
            isAuth={isAuth}
            exact
            isShowSpecialProducts
            path="/productsSpecial/:productId"
            component={ExtendedProductPage}
          />
          <ProtectedRoute
            isAuth={isAuth}
            exact
            isShowSpecialProducts={false}
            path="/products/:productId"
            component={ExtendedProductPage}
          />

          <ProtectedRoute
            isAuth={isAuth}
            path="/products"
            component={ProductsPage}
          />
        </Switch>
      </div>
      {/* {isAuth && <Footer />} */}
    </BrowserRouter>
  );
}

export default App;
