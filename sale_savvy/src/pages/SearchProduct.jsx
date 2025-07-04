import React, { useState } from 'react';

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');   // ✅ Define searchTerm
  const [results, setResults] = useState([]);

 const handleSearch = async () => {
  try {
    const response = await fetch(`http://localhost:8080/searchProduct?name=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
    });
    const data = await response.json();
    setResults(data);
  } catch (error) {
    console.error('Error searching products:', error);
  }
};



  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Products</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}   // ✅ Update state
          className="border px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {results.map((product) => (
            <li key={product.id}>
              {product.name} - ₹{product.rate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
