import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Shop<em>Flow</em></span>
          <p>Curated products, minimal noise.</p>
        </div>
        <nav className="footer__links">
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} ShopFlow</p>
      </div>
    </footer>
  );
}
