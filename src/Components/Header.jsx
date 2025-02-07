// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom"; // if you use react-router-dom for navigation

const Header = () => (
  <header>
    <nav className="nav-wrapper deep-purple darken-3">
      <div className="container">
        <a href="#" className="brand-logo">
          GigHub
        </a>
        <a href="#" data-target="mobile-nav" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="#post-gig">Post a Gig</a>
          </li>
          <li>
            <a href="#find-gig">Find a Gig</a>
          </li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-nav">
      <li>
        <a href="#post-gig">Post a Gig</a>
      </li>
      <li>
        <a href="#find-gig">Find a Gig</a>
      </li>
    </ul>
  </header>
);

export default Header;
