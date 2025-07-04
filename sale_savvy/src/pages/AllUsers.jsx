import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

  // Fetch users from backend
useEffect(() => {
    fetch('http://localhost:8080/allUsers') // Make sure this matches your backend URL
        .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
        })
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
}, []);

return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <table className="min-w-full border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            {/* Add more columns as needed */}
        </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
              {/* Add more fields if your backend sends them */}
            </tr>
            ))}
        </tbody>
    </table>
    </div>
);
};

export default AllUsers;
