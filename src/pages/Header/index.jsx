import React from 'react';
import TopBottomBlock from '../../components/TopBottomBlock';
import NameSiteCompanyComponent from '../../components/NameSiteCompanyComponent';
import style from './styles.module.css';
import LogOutBlockContainer from '../../components/LogOutBlock';

const Header = () => {
  return (
    <header>
      <TopBottomBlock className={style.header}>
        <NameSiteCompanyComponent />
        <LogOutBlockContainer />
      </TopBottomBlock>
    </header>
  );
};

export default Header;
