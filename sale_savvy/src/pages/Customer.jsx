import React, { useState, useEffect } from 'react';

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/getAllProducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
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

  return (
    <div className="customer-home" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Welcome to Your Dashboard</h1>
      <h2>Available Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
       <div
  className="product-list"
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',                  // Adds equal space between cards
    justifyContent: 'center',     // Center the cards on the page
    alignItems: 'flex-start',     // Align tops of the cards
    paddingTop: '20px',
  }}
>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '16px',
                  width: '250px',
                  backgroundColor: '#fefefe',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* 🖼️ Image First */}
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      marginBottom: '12px'
                    }}
                  />
                )}

                {/* 📦 Name */}
                <h3 style={{ margin: '0 0 8px 0' }}>{product.name}</h3>

                {/* 📝 Description */}
                <p style={{ margin: '4px 0', textAlign: 'center' }}>
                  <strong>Description:</strong> {product.description}
                </p>

                {/* 💰 Price */}
                <p style={{ margin: '4px 0' }}>
                  <strong>Price:</strong> ₹{product.rate}
                </p>

                {/* 🛒 Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
}
