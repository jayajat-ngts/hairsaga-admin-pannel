
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
//   LineChart, Line,
//   ResponsiveContainer
// } from "recharts";
//  import React, { useEffect, useState } from "react";
// import { getAllBookings } from "../../api/bookings";
//  import { getAllServices } from "../../api/service";
//  import { getAllStaff, updateStaffStatus } from "../../api/staff";
// const Dashboard = () => {
//    const [stats, setStats] = useState({
//      totalBookings: 0,
//     totalServices: 0,
//     totalStaff:0,
//    });
//    const [staffList, setStaffList] = useState([]);
//    const [segmentationData, setSegmentationData] = useState([]);


//   useEffect(() => {
//   const fetchCounts = async () => {
//     try {
//       const [bookingRes, serviceRes, staffRes] = await Promise.all([
//         getAllBookings(),
//         getAllServices(),
//         getAllStaff(),
//       ]);

//       // COUNTS
//       setStats({
//         totalBookings: Array.isArray(bookingRes?.data?.data)
//           ? bookingRes.data.data.length
//           : 0,

//         totalServices: Array.isArray(serviceRes?.data?.data)
//           ? serviceRes.data.data.length
//           : 0,

//         totalStaff: Array.isArray(staffRes?.data?.data)
//           ? staffRes.data.data.length
//           : 0,
//       });

//       // STAFF LIST
//       const normalizedStaff = Array.isArray(staffRes?.data?.data)
//         ? staffRes.data.data.map((s) => ({
//             id: s._id,
//             name: s.name,
//             role: s.role || "Staff",
//             status: s.status || "Active",
//             image: s.image || null,
//           }))
//         : [];

//       setStaffList(normalizedStaff);

//       // ✅ DYNAMIC SEGMENTATION DATA (Services Pie Chart)
//       setSegmentationData(
//         Array.isArray(serviceRes?.data?.data)
//           ? serviceRes.data.data.map((srv) => ({
//               name: srv.name,
//               value: srv.price || 10, // Use price or duration
//             }))
//           : []
//       );
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     }
//   };

//   fetchCounts();
// }, []);



//    const handleStatusChange = async (id, newStatus) => {
//   try {
//     const res = await updateStaffStatus(id, newStatus);  // ✔ API hit now works
//     console.log("Updated:", res.data);

//     // Update UI
//     setStaffList((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, status: newStatus } : item
//       )
//     );

//     alert("Status Updated!");
//   } catch (err) {
//     console.error("Status update error:", err);
//     alert("Failed to update status!");
//   }
// };

//   const metrics = [
//     { title: "Total Clients", value: 26, percent: 4 },
//     { title: "Total Staff", value: stats.totalStaff },
//      { title: "Total Bookings", value: stats.totalBookings },
//     { title: "Total Services", value: stats.totalServices },
//   ];

//   const employees = [
//     { name: "Wade Warren", status: "Approve", job: "Master" },
//     { name: "Guy Hawkins", status: "Approve", job: "Master" },
//     { name: "Robert Fox", status: "Approve", job: "Master" },
//     { name: "Wade Warren", status: "Approve", job: "Master" },
//     { name: "Jane Cooper", status: "Approve", job: "Master" },
//   ];

//   // const segmentationData = [
//   //   { name: "Haircut", value: 45 },
//   //   { name: "Beard trim", value: 35 },
//   //   { name: "Shaving", value: 20 },
//   // ];

//   const COLORS = ["#2196f3", "#4caf50", "#ff9800"];

//   const growthData = [
//     { month: "Jan", bookings: 50000, cancellations: 20000 },
//     { month: "Feb", bookings: 60000, cancellations: 25000 },
//     { month: "Mar", bookings: 40000, cancellations: 30000 },
//     { month: "Apr", bookings: 70000, cancellations: 45000 },
//     { month: "May", bookings: 80000, cancellations: 60000 },
//     { month: "Jun", bookings: 50000, cancellations: 35000 },
//   ];

//   const barData = [
//     { month: "Jan", value: 60 },
//     { month: "Feb", value: 80 },
//     { month: "Mar", value: 50 },
//     { month: "Apr", value: 100 },
//     { month: "May", value: 60 },
//     { month: "Jun", value: 70 },
//   ];

//   return (
//     <div className="w-full p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold">Hello, John</h1>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3 md:mt-0">
//           Generate Report
//         </button>
//       </div>

//        <div className="w-full p-4 md:p-6">
//        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

//       <div className="grid grid-cols-12 gap-4">
//          {metrics.map((m, i) => (
//           <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
//             <div className="bg-white shadow rounded p-4 h-full">
//               <p className="text-gray-600">{m.title}</p>
//               <h2 className="text-2xl font-bold">{m.value}</h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//       {/* EMPLOYEE TABLE + PIE CHART */}
//       <div className="grid grid-cols-12 gap-4 mt-6">

//         {/* EMPLOYEE TABLE */}

//         <div className="col-span-12 lg:col-span-6">
//           <div className="bg-white rounded shadow p-4 h-full">
//             <h2 className="text-lg font-semibold mb-3">Employees</h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border text-sm md:text-base">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="p-2 border text-left">Profile</th>
//                     <th className="p-2 border text-left">Name</th>
//                     <th className="p-2 border text-left">Role</th>
//                     <th className="p-2 border text-left">Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {staffList.length === 0 ? (
//                     <tr>
//                       <td colSpan="4" className="p-4 text-center">
//                         No staff found.
//                       </td>
//                     </tr>
//                   ) : (
//                     staffList.map((item) => (
//                       <tr key={item.id} className="hover:bg-gray-100">
//                         <td className="p-2 border">
//                           <img
//                             src={
//                               item.image
//                                 ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${item.image}`
//                                 : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//                             }
//                             alt="profile"
//                             className="w-12 h-12 object-cover rounded-full"
//                           />
//                         </td>

//                         <td className="p-2 border">{item.name}</td>
//                         <td className="p-2 border">{item.role}</td>

//                         {/* STATUS SELECT */}
//                         <td className="p-2 border">
//                           <select
//                             value={item.status}
//                             onChange={(e) =>
//                               handleStatusChange(item.id, e.target.value)
//                             }
//                             className={`px-2 py-1 rounded text-sm ${
//                               item.status === "Active"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                           </select>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//          </div>
//         {/* PIE CHART */}
//         <div className="col-span-12 lg:col-span-6">
//           <div className="bg-white rounded shadow p-4 h-full">
//             <h2 className="text-lg font-semibold mb-3">Segmentation</h2>

//             <div className="w-full h-64 md:h-72">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie data={segmentationData} dataKey="value" label>
//   {segmentationData.map((entry, index) => (
//     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//   ))}
// </Pie>

//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </div>

//       </div>

//       {/* LINE + BAR CHART */}
//       <div className="grid grid-cols-12 gap-4 mt-6">

//         {/* LINE CHART */}
//         <div className="col-span-12 lg:col-span-6">
//           <div className="bg-white rounded shadow p-4">
//             <h2 className="text-lg font-semibold mb-3">Customer Growth Rate</h2>

//             <div className="w-full h-72 md:h-80">
//               <ResponsiveContainer>
//                 <LineChart data={growthData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="bookings" stroke="#2196f3" />
//                   <Line type="monotone" dataKey="cancellations" stroke="#ff9800" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </div>

//         {/* BAR CHART */}
//         <div className="col-span-12 lg:col-span-6">
//           <div className="bg-white rounded shadow p-4">
//             <h2 className="text-lg font-semibold mb-3">Services-wise Bookings</h2>

//             <div className="w-full h-72 md:h-80">
//               <ResponsiveContainer>
//                 <BarChart data={barData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#4caf50" barSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

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

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalServices: 0,
    totalStaff: 0,
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

        // PIE CHART DATA
        setSegmentationData(
          Array.isArray(serviceRes?.data?.data)
            ? serviceRes.data.data.map((srv) => ({
              name: srv.name,
              value: srv.price || 10,
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
      const res = await updateStaffStatus(id, newStatus);

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

  // ⭐ Updated Metrics with Icons
  const metrics = [
    { title: "Total Clients", value: 26, icon: Users, color: "bg-blue-100 text-blue-600" },
    { title: "Total Staff", value: stats.totalStaff, icon: Briefcase, color: "bg-green-100 text-green-600" },
    { title: "Total Bookings", value: stats.totalBookings, icon: Book, color: "bg-purple-100 text-purple-600" },
    { title: "Total Services", value: stats.totalServices, icon: Scissors, color: "bg-orange-100 text-orange-600" },
  ];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];


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

      {/* METRICS */}
      <div className="w-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        <div className="grid grid-cols-12 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;

            return (
              <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-5 flex items-center gap-4">

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

      {/* EMPLOYEE TABLE + PIE */}
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
                    <tr>
                      <td colSpan="4" className="py-4 text-center">No staff found.</td>
                    </tr>
                  ) : (
                    staffList.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                      >
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
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full border text-sm ${item.status === "Active"
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

    {/* CENTER LABEL */}
    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
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

      {/* LINE + BAR */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* LINE CHART */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Customer Growth Rate</h2>

            <div className="w-full h-72 md:h-80">
              <ResponsiveContainer>
                <LineChart data={growthData}>

                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2196f3" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="colorCancel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff9800" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#ff9800" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#2196f3"
                    strokeWidth={3}
                    fill="url(#colorBookings)"
                  />

                  <Line
                    type="monotone"
                    dataKey="cancellations"
                    stroke="#ff9800"
                    strokeWidth={3}
                    fill="url(#colorCancel)"
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* BAR CHART */}

        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Services-wise Bookings</h2>

            <div className="w-full h-72 md:h-80">
              <ResponsiveContainer>
                <BarChart data={barData} barCategoryGap="25%">

                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#4a4a4a", fontSize: 14 }}
                    axisLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#4a4a4a", fontSize: 14 }}
                    axisLine={false}
                  />

                  <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />

                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    barSize={28}
                    radius={[10, 10, 10, 10]}
                  />
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
