import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin_page() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/productmanagement">Product Management</Link></li>
        <li><Link to="/admin/usersmanagement">Users Management</Link></li>
      </ul>
    </div>
  );
}
