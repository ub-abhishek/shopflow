import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../App';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCartContext();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="cart-success page-enter">
        <div className="cart-success__icon">🎉</div>
        <h2>Order placed!</h2>
        <p>Thanks for your purchase. You'll receive a confirmation shortly.</p>
        <Link to="/catalog" className="btn btn--primary">Keep shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty page-enter">
        <div className="cart-empty__icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Browse the catalog and add something you'll love.</p>
        <Link to="/catalog" className="btn btn--primary">Browse catalog</Link>
      </div>
    );
  }

  const shipping = total >= 75 ? 0 : 9.95;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart page-enter">
      <div className="container">
        <h1 className="cart__title">Cart <span>({items.reduce((s,i)=>s+i.qty,0)} items)</span></h1>

        <div className="cart__layout">
          {/* Items */}
          <div className="cart__items">
            {items.map(item => (
              <div key={item.key} className="cart-item">
                <div className="cart-item__emoji">{item.product.emoji}</div>
                <div className="cart-item__info">
                  <h3>{item.product.name}</h3>
                  <div className="cart-item__meta">
                    <span className="cart-item__swatch" style={{ background: item.selectedColor }} />
                    <span className="cart-item__cat">{item.product.category}</span>
                  </div>
                </div>
                <div className="cart-item__qty">
                  <button onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase">+</button>
                </div>
                <div className="cart-item__price">
                  ${(item.product.price * item.qty).toFixed(2)}
                </div>
                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remove ${item.product.name}`}
                >
                  ×
                </button>
              </div>
            ))}
            <button className="cart__clear" onClick={clearCart}>Clear cart</button>
          </div>

          {/* Summary */}
          <div className="cart__summary">
            <h2>Order summary</h2>

            <div className="cart__summary-rows">
              <div className="cart__row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <em className="free">Free</em> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart__row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <div className="cart__shipping-nudge">
                  Add ${(75 - total).toFixed(2)} more for free shipping
                </div>
              )}
            </div>

            <div className="cart__total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn btn--accent cart__checkout"
              onClick={() => setOrderPlaced(true)}
            >
              Checkout — ${grandTotal.toFixed(2)}
            </button>
            <p className="cart__secure">🔒 Secure checkout · SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
