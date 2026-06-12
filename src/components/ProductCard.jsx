import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5`}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? 'var(--accent)' : 'none'}
          stroke={s <= Math.round(rating) ? 'var(--accent)' : 'var(--ink-muted)'}
          strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card__img">
        <div className="product-card__emoji" role="img" aria-label={product.name}>
          {product.emoji}
        </div>
        {product.badge && (
          <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ','-')}`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="product-card__discount">−{discount}%</span>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__cat">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__meta">
          <Stars rating={product.rating} />
          <span className="product-card__reviews">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-card__pricing">
          <span className="product-card__price">${product.price}</span>
          {product.originalPrice && (
            <span className="product-card__original">${product.originalPrice}</span>
          )}
        </div>

        <div className="product-card__colors">
          {product.colors.slice(0, 4).map(c => (
            <span key={c} className="product-card__swatch" style={{ background: c }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
