import React, { useState } from 'react';
import '../style/SearchProduct.css'; // ✅ Link your new style file

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/searchProduct?name=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Products</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {results.length === 0 ? (
        <p className="no-results">No products found</p>
      ) : (
        <ul className="search-results">
          {results.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ₹{product.rate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
