import React from 'react';
import NameSiteCompanyComponent from '../NameSiteCompanyComponent';
import TopBottomBlock from '../TopBottomBlock';
import style from './styles.module.css';

const Footer = () => {
  return (
    <footer>
      <TopBottomBlock className={style.footer}>
        <NameSiteCompanyComponent />
      </TopBottomBlock>
    </footer>
  );
};

export default Footer;
