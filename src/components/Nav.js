import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [selected, setSelected] = useState('home-nav');
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li
          onClick={() => setSelected('home-nav')}
          className="nav-item-wrapper"
        >
          <Link
            to="/"
            id="home-nav"
            className={`${
              selected === 'home-nav' ? 'nav-item selected' : 'nav-item'
            }`}
          >
            Home
          </Link>
        </li>
        <li
          onClick={() => setSelected('credit-nav')}
          className="nav-item-wrapper"
        >
          <Link
            to="/credit-app/new"
            id="credit-nav"
            className={`${
              selected === 'credit-nav' ? 'nav-item selected' : 'nav-item'
            }`}
          >
            Credit Apps
          </Link>
        </li>
        <li
          onClick={() => setSelected('solutions-nav')}
          className="nav-item-wrapper"
        >
          <Link
            to="/"
            id="solutions-nav"
            className={`${
              selected === 'solutions-nav' ? 'nav-item selected' : 'nav-item'
            }`}
          >
            Solutions
          </Link>
        </li>
        <li
          onClick={() => setSelected('industries-nav')}
          className="nav-item-wrapper"
        >
          <Link
            to="/"
            id="industries-nav"
            className={`${
              selected === 'industries-nav' ? 'nav-item selected' : 'nav-item'
            }`}
          >
            Industries
          </Link>
        </li>
        <li
          onClick={() => setSelected('about-nav')}
          className="nav-item-wrapper"
        >
          <Link
            to="/"
            id="about-nav"
            className={`${
              selected === 'about-nav' ? 'nav-item selected' : 'nav-item'
            }`}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
