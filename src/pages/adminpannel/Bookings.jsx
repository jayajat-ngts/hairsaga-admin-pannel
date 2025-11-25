import React, { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "../../api/bookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD ALL BOOKINGS
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);

    getAllBookings()
      .then((res) => {
        console.log("API RESPONSE:", res);

        if (!res || !res.data || !Array.isArray(res.data.data)) {
          console.error("Invalid API response format");
          return;
        }

        const normalized = res.data.data.map((b) => ({
          id: b._id,
          name: b.fullname,
          service: b.selectservice,
          date: b.selectdate,
          time: b.selecttime,
          status: b.status || "Pending",
        }));

        setBookings(normalized);
      })
      .catch((err) => {
        console.error("❌ Error fetching bookings:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  };

  // UPDATE STATUS HANDLER
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchBookings(); // Reload updated data
    } catch (err) {
      console.error("❌ Failed to update status", err);
      alert("Status update failed!");
    }
  };

  // COUNT STATISTICS
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-500";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-500";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-500";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Bookings Management</h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-12 md:col-span-4 bg-white rounded shadow p-5">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold">{totalBookings}</h2>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded shadow p-5">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600">{pendingBookings}</h2>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded shadow p-5">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-600">{completedBookings}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Booking List</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">No bookings available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Service</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="text-center hover:bg-gray-50">
                    <td className="p-3 border">{booking.name}</td>
                    <td className="p-3 border">{booking.service}</td>
                    <td className="p-3 border">{booking.date}</td>
                    <td className="p-3 border">{booking.time}</td>

                    {/* STATUS DROPDOWN */}
                    <td className="p-3 border">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`px-3 py-1 rounded font-semibold text-sm cursor-pointer ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
