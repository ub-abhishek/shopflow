import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound page-enter">
      <span className="notfound__code">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="btn btn--primary">Go home</Link>
    </div>
  );
}
