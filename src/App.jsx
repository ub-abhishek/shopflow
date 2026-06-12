import React, { createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const CartContext = createContext(null);
export const useCartContext = () => useContext(CartContext);

export default function App() {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CartContext.Provider>
  );
}
