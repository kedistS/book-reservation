import React from "react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

function Dashboard({ isAdmin }) {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <Notifications />
      <div className="space-y-4 mt-6">
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
        {isAdmin && (
          <Link
            to="/users"
            className="block p-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700"
          >
            Manage Users
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
