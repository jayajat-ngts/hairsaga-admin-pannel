import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus,
  assignStaffToBooking,
} from "../../api/bookings";
import { getAllStaff } from "../../api/staff";
import { ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    fetchStaff();
  }, []);

  // LOAD BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getAllBookings();

      if (!Array.isArray(res?.data?.data)) {
        console.error("Invalid booking response");
        return;
      }

      const normalized = res.data.data.map((b) => ({
        id: b._id,
        name: b.fullname,
        service: b.selectservice,
        date: b.selectdate,
        time: b.selecttime,
        status: b.status || "Pending",
        assignedStaff: b.assignedStaff?._id || "", // keep selected staff
        assignedStaffName: b.assignedStaff?.name || "", // display name
      }));

      setBookings(normalized);
    } catch (err) {
      console.error("❌ Fetch bookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  // LOAD STAFF (Active Only)
  const fetchStaff = async () => {
    try {
      const res = await getAllStaff();

      if (Array.isArray(res?.data?.data)) {
        const active = res.data.data.filter((s) => s.status === "Active");
        setStaffList(active);
      }
    } catch (err) {
      console.error("❌ Staff load error:", err);
    }
  };

  // UPDATE BOOKING STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchBookings();
    } catch (err) {
      console.error("❌ Status update failed:", err);
      alert("Status update failed!");
    }
  };

  // ASSIGN STAFF TO BOOKING (SAVE IN DB)
  const handleAssignStaff = async (bookingId, staffId) => {
    try {
      await assignStaffToBooking(bookingId, staffId);

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? {
              ...b,
              assignedStaff: staffId,
              assignedStaffName:
                staffList.find((s) => s._id === staffId)?.name || "",
            }
            : b
        )
      );

      console.log("Staff assigned successfully!");
    } catch (err) {
      console.error("❌ Assign staff failed:", err);
      alert("Failed to assign staff!");
    }
  };

  // COUNTS
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-500";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-500";
      default:
        return "bg-red-100 text-gray-700 border border-red-500";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-black-600 mb-6">
        Bookings Management
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <ClipboardList size={28} />
            </div>
            <div>
              <p className="text-gray-600">Total Bookings</p>
              <h2 className="text-3xl font-bold">{totalBookings}</h2>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-gray-600">Pending</p>
              <h2 className="text-3xl font-bold text-yellow-600">{pendingBookings}</h2>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <h2 className="text-3xl font-bold text-green-600">{completedBookings}</h2>
            </div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <XCircle size={28} />
            </div>
            <div>
              <p className="text-gray-600">Cancelled</p>
              <h2 className="text-3xl font-bold text-red-600">{cancelledBookings}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Booking List</h2>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-10 h-10 border-4 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left bg-gray-100 text-gray-700 rounded-lg">
                <th className="p-3">Name</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Assigned Staff</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="bg-white shadow-sm rounded-xl hover:bg-gray-50 transition"
                >
                  <td className="p-3 rounded-l-xl">{b.name}</td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.time}</td>

                  {/* STAFF DROPDOWN */}
                  <td className="p-3">
                    <select
                      value={b.assignedStaff}
                      onChange={(e) => handleAssignStaff(b.id, e.target.value)}
                      className="border px-3 py-2 rounded-lg bg-white shadow-sm"
                    >
                      <option value="">Select Staff</option>
                      {staffList.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* STATUS BADGE + DROPDOWN */}
                  <td className="p-3 rounded-r-xl">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className={`px-3 py-1 rounded-full font-medium 
              ${b.status === "Completed"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : b.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                            : "bg-red-100 text-red-700 border border-red-400"
                        }
            `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>
    </div>
  );
};

export default Bookings;
