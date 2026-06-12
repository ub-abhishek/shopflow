import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, products } from '../data/products';
import { useCartContext } from '../App';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function Stars({ rating, reviews }) {
  return (
    <div className="pd-stars">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? 'var(--accent)' : 'none'}
          stroke={s <= Math.round(rating) ? 'var(--accent)' : 'var(--ink-muted)'}
          strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span>{rating} ({reviews.toLocaleString()} reviews)</span>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addItem } = useCartContext();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pd-not-found page-enter">
        <h2>Product not found.</h2>
        <Link to="/catalog" className="btn btn--ghost">← Back to catalog</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product, product.colors[selectedColor]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    for (let i = 0; i < qty; i++) addItem(product, product.colors[selectedColor]);
    navigate('/cart');
  }

  return (
    <div className="pd page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/catalog">Catalog</Link>
          <span>›</span>
          <Link to={`/catalog?cat=${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pd__grid">
          {/* Image */}
          <div className="pd__image">
            <div className="pd__emoji-wrap">
              <div className="pd__emoji-bg" style={{ background: product.colors[selectedColor] + '22' }} />
              <span className="pd__emoji" role="img" aria-label={product.name}>{product.emoji}</span>
            </div>
            {product.badge && <span className="pd__badge">{product.badge}</span>}
          </div>

          {/* Info */}
          <div className="pd__info">
            <p className="pd__cat">{product.category}</p>
            <h1 className="pd__name">{product.name}</h1>
            <Stars rating={product.rating} reviews={product.reviews} />

            <div className="pd__pricing">
              <span className="pd__price">${product.price}</span>
              {product.originalPrice && <>
                <span className="pd__original">${product.originalPrice}</span>
                <span className="pd__save">Save {discount}%</span>
              </>}
            </div>

            <p className="pd__desc">{product.description}</p>

            {/* Features */}
            <div className="pd__features">
              {product.features.map(f => (
                <div key={f} className="pd__feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            {/* Color picker */}
            <div className="pd__section">
              <p className="pd__label">Color</p>
              <div className="pd__colors">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    className={`pd__color${selectedColor === i ? ' pd__color--active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Color option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="pd__section">
              <p className="pd__label">Quantity</p>
              <div className="pd__qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} aria-label="Increase">+</button>
              </div>
              <p className="pd__stock">{product.stock} in stock</p>
            </div>

            {/* CTAs */}
            <div className="pd__ctas">
              <button
                className={`btn btn--accent pd__add${added ? ' pd__add--done' : ''}`}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? '✓ Added to cart' : 'Add to cart'}
              </button>
              <button className="btn btn--ghost" onClick={handleBuyNow}>
                Buy now
              </button>
            </div>

            {/* Trust badges */}
            <div className="pd__trust">
              {['Free shipping over $75', '30-day returns', 'Secure checkout'].map(t => (
                <span key={t} className="pd__trust-item">✓ {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd__related">
            <h2>More in {product.category}</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
