import React from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/reducers/AuthReducer';
import LoginForm from './login';
import style from './styles.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleAuthDataFetched = ({ email, token, isAuth }) =>
    dispatch(setAuthData({ email, isAuth, token }));

  return (
    <div className={style.page}>
      <div className={style.rightImg} />
      <div className={style.leftImg} />
      <LoginForm onAuthDataFetched={handleAuthDataFetched} />
    </div>
  );
};

export default LoginPage;
