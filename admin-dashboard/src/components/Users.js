import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get('/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
      setLoading(false);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await axiosWithAuth.put(`/users/${id}`, { role });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-indigo-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-indigo-600 truncate">{user.name}</p>
              <p
                className={`px-3 py-1 text-sm rounded-full ${
                  user.role === 'admin'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user.role}
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500">{user.email}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => updateUserRole(user._id, 'admin')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Make Admin
              </button>
              <button
                onClick={() => updateUserRole(user._id, 'user')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Revoke Admin
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
