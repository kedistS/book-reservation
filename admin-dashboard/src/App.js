import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Books from './components/Books';
import Reservations from './components/Reservations';
import Users from './components/Users';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <Router>
      <div className="bg-red-500 p-4 text-white">Tailwind is working!</div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-indigo-600">Admin Dashboard</span>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink to="/">Dashboard</NavLink>
                  <NavLink to="/books">Books</NavLink>
                  <NavLink to="/reservations">Reservations</NavLink>
                  <NavLink to="/users">Users</NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <Routes>
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
                  <Route path="/reservations" element={<PrivateRoute><Reservations /></PrivateRoute>} />
                  <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-500 hover:text-indigo-600 hover:border-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}

export default App;