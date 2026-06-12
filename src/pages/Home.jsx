import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featured = products.filter(p => ['top-rated', 'best-seller'].includes(p.badge?.toLowerCase().replace(' ','-'))).slice(0, 4);

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">New arrivals · June 2026</span>
            <h1 className="hero__title">
              Things made<br />
              <em>to last.</em>
            </h1>
            <p className="hero__sub">
              A tightly curated catalog of tools, objects, and apparel selected for longevity over trend.
              No noise. No rush.
            </p>
            <div className="hero__ctas">
              <Link to="/catalog" className="btn btn--primary">Browse Catalog</Link>
              <Link to="/catalog?cat=new" className="btn btn--ghost">What's new →</Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__grid">
              {products.slice(0, 4).map(p => (
                <div key={p.id} className="hero__chip">
                  <span className="hero__chip-emoji">{p.emoji}</span>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="container stats-strip__inner">
          {[
            { n: '8', label: 'Products, zero compromises' },
            { n: '4.7★', label: 'Average customer rating' },
            { n: '7k+', label: 'Verified reviews' },
            { n: '∞', label: 'Return window on defects' },
          ].map(s => (
            <div key={s.n} className="stats-strip__item">
              <strong>{s.n}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Top rated</h2>
            <Link to="/catalog" className="section__more">All products →</Link>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Free shipping on orders over $75</h2>
            <p>Ships within 2 business days. 30-day returns, no questions.</p>
          </div>
          <Link to="/catalog" className="btn btn--primary">Shop now</Link>
        </div>
      </section>
    </div>
  );
}
