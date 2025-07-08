// src/components/ProductCart.js
import React, { useState } from "react";
import './ProductCard.css'; // make sure to create this CSS file

export default function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (qty < 1) return;
    onAddToCart(product, qty);
    setQty(1); 
  };

  return (
    <div className="product-card">
      <img src={product.photo} alt={product.name} className="product-image" />

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p>₹{product.price}</p>
        <p className="product-desc">{product.description}</p>

        <div className="product-actions">
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="qty-input"
          />
          <button onClick={handleAdd} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
