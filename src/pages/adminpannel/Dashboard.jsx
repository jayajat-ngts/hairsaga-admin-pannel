
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";
 import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../api/bookings";
 import { getAllServices } from "../../api/service";
 import { getAllStaff, updateStaffStatus } from "../../api/staff";
const Dashboard = () => {
   const [stats, setStats] = useState({
     totalBookings: 0,
    totalServices: 0,
    totalStaff:0,
   });
   const [staffList, setStaffList] = useState([]);
   const [segmentationData, setSegmentationData] = useState([]);

 
  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const [bookingRes, serviceRes, staffRes] = await Promise.all([
        getAllBookings(),
        getAllServices(),
        getAllStaff(),
      ]);

      // COUNTS
      setStats({
        totalBookings: Array.isArray(bookingRes?.data?.data)
          ? bookingRes.data.data.length
          : 0,

        totalServices: Array.isArray(serviceRes?.data?.data)
          ? serviceRes.data.data.length
          : 0,

        totalStaff: Array.isArray(staffRes?.data?.data)
          ? staffRes.data.data.length
          : 0,
      });

      // STAFF LIST
      const normalizedStaff = Array.isArray(staffRes?.data?.data)
        ? staffRes.data.data.map((s) => ({
            id: s._id,
            name: s.name,
            role: s.role || "Staff",
            status: s.status || "Active",
            image: s.image || null,
          }))
        : [];

      setStaffList(normalizedStaff);

      // ✅ DYNAMIC SEGMENTATION DATA (Services Pie Chart)
      setSegmentationData(
        Array.isArray(serviceRes?.data?.data)
          ? serviceRes.data.data.map((srv) => ({
              name: srv.name,
              value: srv.price || 10, // Use price or duration
            }))
          : []
      );
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  fetchCounts();
}, []);

 

   const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await updateStaffStatus(id, newStatus);  // ✔ API hit now works
    console.log("Updated:", res.data);

    // Update UI
    setStaffList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    alert("Status Updated!");
  } catch (err) {
    console.error("Status update error:", err);
    alert("Failed to update status!");
  }
};

  const metrics = [
    { title: "Total Clients", value: 26, percent: 4 },
    { title: "Total Staff", value: stats.totalStaff },
     { title: "Total Bookings", value: stats.totalBookings },
    { title: "Total Services", value: stats.totalServices },
  ];

  const employees = [
    { name: "Wade Warren", status: "Approve", job: "Master" },
    { name: "Guy Hawkins", status: "Approve", job: "Master" },
    { name: "Robert Fox", status: "Approve", job: "Master" },
    { name: "Wade Warren", status: "Approve", job: "Master" },
    { name: "Jane Cooper", status: "Approve", job: "Master" },
  ];

  // const segmentationData = [
  //   { name: "Haircut", value: 45 },
  //   { name: "Beard trim", value: 35 },
  //   { name: "Shaving", value: 20 },
  // ];

  const COLORS = ["#2196f3", "#4caf50", "#ff9800"];

  const growthData = [
    { month: "Jan", bookings: 50000, cancellations: 20000 },
    { month: "Feb", bookings: 60000, cancellations: 25000 },
    { month: "Mar", bookings: 40000, cancellations: 30000 },
    { month: "Apr", bookings: 70000, cancellations: 45000 },
    { month: "May", bookings: 80000, cancellations: 60000 },
    { month: "Jun", bookings: 50000, cancellations: 35000 },
  ];

  const barData = [
    { month: "Jan", value: 60 },
    { month: "Feb", value: 80 },
    { month: "Mar", value: 50 },
    { month: "Apr", value: 100 },
    { month: "May", value: 60 },
    { month: "Jun", value: 70 },
  ];

  return (
    <div className="w-full p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Hello, John</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3 md:mt-0">
          Generate Report
        </button>
      </div>

       <div className="w-full p-4 md:p-6">
       <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-12 gap-4">
         {metrics.map((m, i) => (
          <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="bg-white shadow rounded p-4 h-full">
              <p className="text-gray-600">{m.title}</p>
              <h2 className="text-2xl font-bold">{m.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* EMPLOYEE TABLE + PIE CHART */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* EMPLOYEE TABLE */}
       
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4 h-full">
            <h2 className="text-lg font-semibold mb-3">Employees</h2>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Profile</th>
                    <th className="p-2 border text-left">Name</th>
                    <th className="p-2 border text-left">Role</th>
                    <th className="p-2 border text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {staffList.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-4 text-center">
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100">
                        <td className="p-2 border">
                          <img
                            src={
                              item.image
                                ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${item.image}`
                                : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            }
                            alt="profile"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>

                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.role}</td>

                        {/* STATUS SELECT */}
                        <td className="p-2 border">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className={`px-2 py-1 rounded text-sm ${
                              item.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
         </div>
        {/* PIE CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4 h-full">
            <h2 className="text-lg font-semibold mb-3">Segmentation</h2>

            <div className="w-full h-64 md:h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={segmentationData} dataKey="value" label>
  {segmentationData.map((entry, index) => (
    <Cell key={index} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>

                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>

      {/* LINE + BAR CHART */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* LINE CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Customer Growth Rate</h2>

            <div className="w-full h-72 md:h-80">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#2196f3" />
                  <Line type="monotone" dataKey="cancellations" stroke="#ff9800" />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Services-wise Bookings</h2>

            <div className="w-full h-72 md:h-80">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4caf50" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
