import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axiosWithAuth.get("/reservations");
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Failed to fetch reservations. Please try again later.");
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await axiosWithAuth.put(`/reservations/${id}`, { status });
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError("Failed to update reservation. Please try again.");
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reservations</h2>
      <ul className="divide-y divide-gray-200">
        {reservations.map((reservation) => (
          <li key={reservation._id} className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-indigo-600 truncate">
                {reservation.user.name} - {reservation.book.title}
              </p>
              <p
                className={`px-3 py-1 text-sm rounded-full ${
                  reservation.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : reservation.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {reservation.status}
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {new Date(reservation.startDate).toLocaleDateString()} -{" "}
              {new Date(reservation.endDate).toLocaleDateString()}
            </p>
            {reservation.status === "pending" && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() =>
                    updateReservationStatus(reservation._id, "approved")
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    updateReservationStatus(reservation._id, "rejected")
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;
