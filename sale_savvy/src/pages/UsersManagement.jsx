import React from 'react';
import { Link } from 'react-router-dom';
import '../style/UsersManagement.css'; // ✅ Link external style file

export default function UsersManagement() {
  return (
    <div className="users-management-container">
      <h2>Users Management</h2>
      <div className="user-links">
        <Link to="allusers" className="user-link">👥 View All Users</Link>
        <Link to="deleteusers" className="user-link">🗑️ Delete Users</Link>
      </div>
    </div>
  );
}
