import React from 'react';
import { Link } from 'react-router-dom';
import '../style/AdminPage.css'; 

export default function Admin_page() {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <ul className="admin-links">
        <li>
          <Link to="/admin/productmanagement">📦 Product Management</Link>
        </li>
        <li>
          <Link to="/admin/usersmanagement">👤 Users Management</Link>
        </li>
      </ul>
    </div>
  );
}
