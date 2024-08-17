import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to the admin dashboard.</p>
      <div className="space-y-4">
        <Link
          to="/books"
          className="block p-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700"
        >
          Manage Books
        </Link>
        <Link
          to="/reservations"
          className="block p-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700"
        >
          Manage Reservations
        </Link>
        <Link
          to="/users"
          className="block p-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
