import React, { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price-asc':   return [...list].sort((a,b) => a.price - b.price);
      case 'price-desc':  return [...list].sort((a,b) => b.price - a.price);
      case 'rating':      return [...list].sort((a,b) => b.rating - a.rating);
      case 'reviews':     return [...list].sort((a,b) => b.reviews - a.reviews);
      default:            return list;
    }
  }, [activeCategory, search, sort]);

  return (
    <div className="catalog page-enter">
      <div className="container">
        {/* Header */}
        <div className="catalog__header">
          <div>
            <h1 className="catalog__title">Catalog</h1>
            <p className="catalog__count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="catalog__controls">
            <div className="catalog__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <select
              className="catalog__sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              aria-label="Sort by"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="catalog__filters" role="tablist" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`catalog__filter-btn${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="catalog__empty">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter.</p>
            <button className="btn btn--ghost" onClick={() => { setSearch(''); setActiveCategory('all'); }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
