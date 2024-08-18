import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get("/users/all");
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
      await axiosWithAuth.put(`/users/approve/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) -
            {user.isApproved ? (
              "Approved"
            ) : (
              <button onClick={() => approveUser(user._id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
