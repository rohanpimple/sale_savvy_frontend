import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCart';
import NavBar from '../components/NavBar'; 
import '../style/CustomerHome.css';

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
  const updatedCart = [...cart];
  const existing = updatedCart.find(item => item.product.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    updatedCart.push({ product, qty });
  }

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  alert(`Added ${qty} of ${product.name} to cart.`);
};


  return (
    <div className="customer-app">
      {/* Add NavBar at the top */}
      <NavBar cartCount={cart.length} />

      <div className="customer-container">
        <h1 className="title">Welcome to SaleSavvy</h1>
        <h2 className="subtitle">Browse Our Products</h2>

        {loading ? (
          <p className="status-msg">Loading products...</p>
        ) : error ? (
          <p className="status-msg error">{error}</p>
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
              <p className="status-msg">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}