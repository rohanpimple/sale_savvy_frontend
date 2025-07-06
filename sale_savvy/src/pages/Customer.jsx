import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCart';
import './CustomerHome.css'; // Optional for styling

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/getAllProducts');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, qty) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevCart, { product, qty }];
      }
    });

    alert(`Added ${qty} of ${product.name} to cart.`);
  };

  const handleGoToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="customer-container">
      <h1 className="title">Customer Home</h1>
      <h2 className="subtitle">Available Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.rate,
                  description: product.description,
                  photo: product.image,
                }}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-button-wrapper">
          <button className="go-cart-btn" onClick={handleGoToCart}>
            Go to Cart ({cart.length} items)
          </button>
        </div>
      )}
    </div>
  );
}
