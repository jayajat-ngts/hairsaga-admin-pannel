import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAllServices } from "../../api/service";
import { deleteService } from "../../api/service";

const categories = [
  "All",
  "Hair",
  "Skin",
  "Makeup",
  "Body",
  "Waxing",
  "Nail",
  "Spa",
  "Packages",
];

const Services = () => {
  const [filter, setFilter] = useState("All");
  const [services, setServices] = useState([]); // <-- dynamic data
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // -------------------------------
  // ✅ Fetch Services From API
  // -------------------------------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        setServices(res.data.data); // backend returns { data: [...] }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteService(id);
      alert("Service deleted successfully!");

      // Refresh services (later we replace this with real API)
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    }
  };

  // -------------------------------
  // 🔍 Filter + search logic
  // -------------------------------
  const filteredServices = services.filter(
    (service) =>
      (filter === "All" || service.category === filter) &&
      service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Services</h2>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          onClick={() => navigate("/admin/add-service")}
        >
          <FiPlus /> Add Service
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center border px-3 py-2 rounded-lg bg-white w-full sm:w-64">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="ml-2 outline-none w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border ${filter === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={
                service.image
                  ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${service.image}`
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
              }}
              alt={service?.name || "Service Image"}
              className="w-full h-40 object-cover rounded-md"
            />


            <div className="p-4">
              <h3 className="font-bold text-xl">{service.name}</h3>
              <p className="text-gray-500 text-sm">{service.category}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-lg font-semibold">₹{service.price}</span>
                <span className="text-sm text-gray-500">
                  {service.duration}
                </span>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  onClick={() => navigate(`/admin/edit-service/${service._id}`)}
                >
                  <FiEdit /> Edit
                </button>


                <button
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(service._id)}
                >
                  <FiTrash2 /> Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No services found.
        </p>
      )}
    </div>
  );
};

export default Services;
