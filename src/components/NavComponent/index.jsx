import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';

const NavBlock = () => {
  const isAuth = useSelector((state) => state.authData.isAuth);
  // const id = useSelector((state) => state.profileData.profile.id);
  const id = 10;
  return (
    isAuth && (
      <nav className={style.navBlock}>
        <NavLink
          to={`/products`}
          className={style.navLink}
          activeClassName={style.activeNav}
        >
          Regular Products
        </NavLink>
        <NavLink
          to="/productsSpecial"
          className={style.navLink}
          activeClassName={style.activeNav}
        >
          Special Products
        </NavLink>
      </nav>
    )
  );
};
export default NavBlock;
