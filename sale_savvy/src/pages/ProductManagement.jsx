import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductManagement() {
  return (
    <div>
      <h2>Product Management Dashboard</h2>
      <ul>
        <li><Link to="add">➕ Add Product</Link></li>
        <li><Link to="update">✏️ Update Product</Link></li>
        <li><Link to="search">🔍 Search Product</Link></li>
        <li><Link to="delete">🗑️ Delete Product</Link></li>
      </ul>
    </div>
  );
}
