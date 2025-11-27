import React, { useEffect, useState } from "react";
import { getAllInquiries } from "../../api/inquiry";

const InquiryPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await getAllInquiries();
            console.log("INQUIRY RESPONSE:", res?.data);

            let data = res?.data?.data || res?.data?.inquiries || res?.data;

            // 🔥 FIX: Ensure data is ALWAYS an array
            if (Array.isArray(data)) {
                setInquiries(data);
            } else if (typeof data === "object" && data !== null) {
                // If backend sends single object, convert to array
                setInquiries([data]);
            } else {
                setInquiries([]);
            }

        } catch (err) {
            console.error("❌ Error fetching inquiries:", err);
            setInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-black-600">Customer Inquiries</h1>

            <div className="bg-white shadow-lg rounded p-6">
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : inquiries.length === 0 ? (
                    <p className="text-gray-600 text-center">No Inquiries Found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-3">

                            {/* TABLE HEADER */}
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 rounded-lg">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Subject</th>
                                    <th className="p-3 text-left">Message</th>
                                    <th className="p-3 text-left">Date</th>
                                </tr>
                            </thead>

                            {/* TABLE BODY */}
                            <tbody>
                                {inquiries.map((inq) => (
                                    <tr
                                        key={inq._id || Math.random()}
                                        className="bg-white shadow-sm hover:shadow-lg transition rounded-xl"
                                    >
                                        {/* NAME */}
                                        <td className="p-3 font-medium text-gray-800 rounded-l-xl">
                                            {inq.name || "--"}
                                        </td>

                                        {/* EMAIL */}
                                        <td className="p-3 text-gray-700">{inq.email || "--"}</td>

                                        {/* PHONE */}
                                        <td className="p-3 text-gray-700">{inq.phonenumber || "--"}</td>

                                        {/* SUBJECT */}
                                        <td className="p-3">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                {inq.subject || "--"}
                                            </span>
                                        </td>

                                        {/* MESSAGE */}
                                        <td className="p-3 text-gray-700 max-w-xs break-words">
                                            {inq.message || "--"}
                                        </td>

                                        {/* DATE */}
                                        <td className="p-3 text-gray-600 rounded-r-xl">
                                            {inq.createdAt
                                                ? new Date(inq.createdAt).toLocaleDateString()
                                                : "--"}
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

export default InquiryPage;
