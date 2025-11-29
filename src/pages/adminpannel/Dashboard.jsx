import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";

import React, { useEffect, useState } from "react";
import { Users, Briefcase, Book, Scissors } from "lucide-react";

import { getAllBookings } from "../../api/bookings";
import { getAllServices } from "../../api/service";
import { getAllStaff, updateStaffStatus } from "../../api/staff";
import { getAllInquiries } from "../../api/inquiry";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalServices: 0,
    totalStaff: 0,
    totalInquiry: 0,
  });

  const [staffList, setStaffList] = useState([]);
  const [segmentationData, setSegmentationData] = useState([]);
  const [barData, setBarData] = useState([]);     
  const [monthData, setMonthData] = useState([]); 
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [bookingRes, serviceRes, staffRes, inquiryRes] = await Promise.all([
          getAllBookings(),
          getAllServices(),
          getAllStaff(),
          getAllInquiries(),
        ]);

        const bookings = bookingRes?.data?.data || [];
        const services = serviceRes?.data?.data || [];
        const staff = staffRes?.data?.data || [];
        const inquiries = inquiryRes?.data?.data || [];

        // ------------------ STATS ------------------
        setStats({
          totalBookings: bookings.length,
          totalServices: services.length,
          totalStaff: staff.length,
          totalInquiry: inquiries.length,
        });

        // ------------------ STAFF LIST ------------------
        const normalizedStaff = staff.map((s) => ({
          id: s._id,
          name: s.name,
          role: s.role || "Staff",
          status: s.status || "Active",
          image: s.image || null,
        }));
        setStaffList(normalizedStaff);

        // ------------------ PIE CHART ------------------
        setSegmentationData(
          services.map((srv) => ({
            name: srv.name,
            value: srv.price || 10,
          }))
        );

        // ------------------ SERVICE-WISE BOOKINGS ------------------
        const serviceCountMap = {};

        bookings.forEach((b) => {
          const serviceName =
            b?.service?.name ||
            services.find((s) => s._id === b.serviceId)?.name ||
            "Unknown";

          serviceCountMap[serviceName] =
            (serviceCountMap[serviceName] || 0) + 1;
        });

        const serviceWiseBooking = Object.entries(serviceCountMap).map(
          ([service, total]) => ({ service, total })
        );

        setBarData(serviceWiseBooking);

        // ------------------ MONTH-WISE BOOKINGS ------------------
        const monthCountMap = {};

        bookings.forEach((b) => {
          const date = new Date(b.createdAt);
          const monthIndex = date.getMonth();
          const monthName = MONTHS[monthIndex];
          monthCountMap[monthName] = (monthCountMap[monthName] || 0) + 1;
        });

        setMonthData(
          MONTHS.map((m) => ({
            month: m,
            total: monthCountMap[m] || 0,
          }))
        );

        // ------------ DYNAMIC BOOKINGS + CANCELLATIONS ------------
        const bookedMap = {};
        const cancelledMap = {};

        bookings.forEach((b) => {
          const date = new Date(b.createdAt);
          const month = MONTHS[date.getMonth()];

          if (b.status?.toLowerCase() === "cancelled") {
            cancelledMap[month] = (cancelledMap[month] || 0) + 1;
          } else {
            bookedMap[month] = (bookedMap[month] || 0) + 1;
          }
        });

        setGrowthData(
          MONTHS.map((m) => ({
            month: m,
            bookings: bookedMap[m] || 0,
            cancellations: cancelledMap[m] || 0,
          }))
        );

      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    fetchCounts();
  }, []);


  // ------------------ STAFF STATUS UPDATE ------------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStaffStatus(id, newStatus);

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


  // ------------------ METRICS ------------------
  const metrics = [
    { title: "Total Inquiry", value: stats.totalInquiry, icon: Users, color: "bg-blue-100 text-blue-600" },
    { title: "Total Staff", value: stats.totalStaff, icon: Briefcase, color: "bg-green-100 text-green-600" },
    { title: "Total Bookings", value: stats.totalBookings, icon: Book, color: "bg-purple-100 text-purple-600" },
    { title: "Total Services", value: stats.totalServices, icon: Scissors, color: "bg-orange-100 text-orange-600" },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];


  return (
    <div className="w-full p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Hello, John</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Generate Report</button>
      </div>

      {/* METRICS */}
      <div className="w-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        <div className="grid grid-cols-12 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;

            return (
              <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">

                  <div className={`p-3 rounded-full ${m.color}`}>
                    <Icon size={28} />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">{m.title}</p>
                    <h2 className="text-3xl font-bold mt-1">{m.value}</h2>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* EMPLOYEE TABLE + PIE CHART */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* EMPLOYEE TABLE */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4 h-full">
            <h2 className="text-lg font-semibold mb-3">Employees</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2 px-3">Profile</th>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {staffList.length === 0 ? (
                    <tr><td colSpan="4" className="py-4 text-center">No staff found.</td></tr>
                  ) : (
                    staffList.map((item) => (
                      <tr key={item.id} className="bg-gray-50 hover:bg-gray-100 rounded-xl shadow-sm">
                        <td className="py-3 px-3">
                          <img
                            src={
                              item.image
                                ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${item.image}`
                                : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            }
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        </td>

                        <td className="py-3 px-3 font-medium">{item.name}</td>
                        <td className="py-3 px-3 text-gray-600">{item.role}</td>

                        <td className="py-3 px-3">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`px-3 py-1 rounded-full border text-sm ${
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
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
            <h2 className="text-xl font-semibold mb-4">Service Popularity</h2>

            <div className="w-full h-72 relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={segmentationData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {segmentationData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <p className="text-gray-500 text-sm">Most Popular</p>
                <p className="text-xl font-bold text-gray-700">
                  {
                    segmentationData.length > 0
                      ? segmentationData.reduce((max, item) =>
                        item.value > max.value ? item : max
                      ).name
                      : "—"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* LINE + BAR SECTION */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* GROWTH CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Customer Growth Rate</h2>
            <div className="w-full h-72">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#2196f3" strokeWidth={3} />
                  <Line type="monotone" dataKey="cancellations" stroke="#ff9800" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MONTH-WISE BOOKINGS BAR CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Month-wise Bookings</h2>

            <div className="w-full h-72 md:h-80">
              <ResponsiveContainer>
                <BarChart data={monthData} barCategoryGap="20%">
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#3b82f6" radius={[10, 10, 10, 10]} />
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
