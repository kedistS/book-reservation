import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get('/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-indigo-600 p-4">
        <h2 className="text-2xl font-semibold text-white">Books</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {books.map(book => (
          <li key={book._id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-900">{book.title}</p>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                {book.author}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Published on: {new Date(book.publicationDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
