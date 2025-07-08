import React, { useEffect, useState } from 'react';
import '../style/DeleteUsers.css'; 

export default function DeleteUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/allUsers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/deleteUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        alert('User deleted successfully');
        fetchUsers(); 
      } else {
        const msg = await response.text();
        console.error('Delete failed:', msg);
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="delete-users-container">
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-users">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
