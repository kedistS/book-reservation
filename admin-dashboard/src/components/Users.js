import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function UserManagement({ setNotifications }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get("/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    try {
      await axiosWithAuth.put(`/users/${id}/approve`);
      // Remove the notification for the approved user
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.user && notification.user._id !== id
        )
      );
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user. Please try again.");
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-indigo-600 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center">
                <p
                  className={`px-3 py-1 text-sm rounded-full ${
                    user.isApproved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.isApproved ? "Approved" : "Pending"}
                </p>
                {!user.isApproved && (
                  <button
                    onClick={() => approveUser(user._id)}
                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
