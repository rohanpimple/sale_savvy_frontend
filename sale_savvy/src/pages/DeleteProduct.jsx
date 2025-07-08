import React, { useEffect, useState } from 'react';
import '../style/DeleteProduct.css'; // ✅ Add external CSS

function DeleteProductsPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/getAllProducts');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (keyword.trim() === '') {
      fetchAllProducts();
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/searchProduct?name=${keyword}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost:8080/deleteProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        alert('Product deleted successfully');
        fetchAllProducts();
      } else {
        const message = await response.text();
        alert(`Failed to delete: ${message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Products</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by product name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <span>
                <strong>{product.name}</strong> - {product.description} - ₹{product.rate}
              </span>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))
        ) : (
          !loading && <p className="no-products">No products found.</p>
        )}
      </ul>
    </div>
  );
}

export default DeleteProductsPage;
