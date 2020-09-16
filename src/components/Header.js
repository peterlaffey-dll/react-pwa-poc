import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import TabPanel from './TabPanel';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-wrapper">
        <picture>
          <source srcSet="logo-big.svg" media="(min-width: 1200px)"></source>
          <img src="logo-small.svg" alt="DLL Logo" className="logo" />
        </picture>
      </Link>
      <div className="nav-wrapper">
        <Nav />
      </div>
      <TabPanel />
    </header>
  );
};

export default Header;
