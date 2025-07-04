import React, { useEffect, useState } from 'react';

function DeleteProductsPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔁 Load all products on page load
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

  // 🔍 Search products by name
  const handleSearch = async () => {
    if (keyword.trim() === '') {
      fetchAllProducts(); // show all again if search is empty
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

  // 🗑 Delete a product
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
        fetchAllProducts(); // refresh list
      } else {
        const message = await response.text();
        alert(`Failed to delete: ${message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Delete Products</h2>

      <div>
        <input
          type="text"
          placeholder="Search by product name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ padding: '8px 12px', marginLeft: '10px' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
              <strong>{product.name}</strong> - {product.description} - ₹{product.rate}
              <button
                onClick={() => handleDelete(product.id)}
                style={{ marginLeft: '20px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none' }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          !loading && <p>No products found.</p>
        )}
      </ul>
    </div>
  );
}

export default DeleteProductsPage;
