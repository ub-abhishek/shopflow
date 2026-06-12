# ShopFlow — E-commerce Product Catalog

A production-ready e-commerce product catalog built with React, React Router, and Vite.

## Features
- **Client-side routing** — Home, Catalog, Product Detail, Cart, 404
- **Product catalog** with category filters, search, and sort
- **Cart** with qty controls, color selection, tax/shipping calc, order success state
- **Responsive** — mobile-first, works on all screen sizes
- **Optimized build** — code splitting, minified, Terser compression, long-term asset caching
- **Accessible** — keyboard focus rings, ARIA labels, reduced motion support

## Stack
- React 18 + React Router v6
- Vite 5 (build tool)
- Plain CSS (no framework, custom design system)

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel (recommended — 2 minutes)

1. Push this folder to a GitHub repository
2. Go to https://vercel.com → New Project
3. Import the repo
4. Framework preset: **Vite**
5. Click **Deploy**

`vercel.json` already handles SPA routing and asset caching.

---

## Deploy to Netlify

1. Push to GitHub
2. Go to https://app.netlify.com → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

`netlify.toml` handles SPA routing automatically.

---

## Deploy to Render

1. Push to GitHub
2. Render → New → Static Site
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add redirect rule: `/* → /index.html (200)`

---

## Project Structure

```
src/
  components/
    Navbar.jsx / .css
    ProductCard.jsx / .css
    Footer.jsx / .css
  pages/
    Home.jsx / .css
    Catalog.jsx / .css
    ProductDetail.jsx / .css
    Cart.jsx / .css
    NotFound.jsx / .css
  data/
    products.js         ← product catalog data
  hooks/
    useCart.js          ← cart state logic
  App.jsx               ← routes + CartContext
  main.jsx              ← entry point
  index.css             ← design system (CSS variables)
```
