import React, { useEffect, useState } from "react";
import { getAllStaff, updateStaffStatus } from "../../api/staff";

const StaffList = () => {
    const [staffList, setStaffList] = useState([]);

    // FETCH STAFF LIST
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await getAllStaff();

                const normalized =
                    Array.isArray(res?.data?.data) &&
                    res.data.data.map((s) => ({
                        id: s._id,
                        name: s.name,
                        email: s.email,
                        phone: s.phone,
                        role: s.role || "Staff",
                        status: s.status || "Active",
                        image: s.image,
                    }));

                setStaffList(normalized || []);
            } catch (error) {
                console.error("Failed to load staff:", error);
            }
        };

        fetchStaff();
    }, []);

    // UPDATE STATUS HANDLER
    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateStaffStatus(id, newStatus);

            setStaffList((prev) =>
                prev.map((staff) =>
                    staff.id === id ? { ...staff, status: newStatus } : staff
                )
            );

            alert("Status updated!");
        } catch (error) {
            console.error("Status update error:", error);
            alert("Failed to update status!");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">All Staff</h1>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-3">

                        {/* Table Header */}
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 rounded-lg">
                                <th className="p-3 text-left">Profile</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {staffList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-6 text-gray-500">
                                        No staff found.
                                    </td>
                                </tr>
                            ) : (
                                staffList.map((s) => (
                                    <tr
                                        key={s.id}
                                        className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
                                    >
                                        {/* Profile */}
                                        <td className="p-3 rounded-l-xl">
                                            <img
                                                src={
                                                    s.image
                                                        ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${s.image}`
                                                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                                }
                                                alt="Staff"
                                                className="w-14 h-14 rounded-full object-cover border shadow-sm"
                                            />
                                        </td>

                                        {/* Name */}
                                        <td className="p-3 font-medium text-gray-800">{s.name}</td>

                                        {/* Email */}
                                        <td className="p-3 text-gray-600">{s.email}</td>

                                        {/* Phone */}
                                        <td className="p-3 text-gray-600">{s.phone}</td>

                                        {/* Role */}
                                        <td className="p-3 text-gray-700">{s.role}</td>

                                        {/* Status Dropdown */}
                                        <td className="p-3 rounded-r-xl">
                                            <select
                                                value={s.status}
                                                onChange={(e) => handleStatusChange(s.id, e.target.value)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm border ${s.status === "Active"
                                                        ? "bg-green-100 text-green-700 border-green-300"
                                                        : "bg-red-100 text-red-700 border-red-300"
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
    );
};

export default StaffList;
