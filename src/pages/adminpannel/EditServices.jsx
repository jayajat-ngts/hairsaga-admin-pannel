import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "../../api/service";
import { toast } from "react-toastify";
const categories = [
  "Hair",
  "Skin",
  "Makeup",
  "Body",
  "Waxing",
  "Nail",
  "Spa",
  "Packages",
];

const EditService = () => {
  const { id } = useParams(); // get service ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    buffer: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await getServiceById(id);
        const data = res.data.data;

        setForm({
          name: data.name,
          category: data.category,
          price: data.price,
          duration: data.duration,
          buffer: data.buffer,
          description: data.description,
          image: null,
          imagePreview: data.image
            ? `${import.meta.env.VITE_API_BASE_URL}/uploads/services/${data.image}`
            : "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load service details");
      }
    };

    fetchService();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({
        ...form,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      await updateService(id, formData);
     toast.success("Service Updated Successfully!",{
           position: "top-right",
            autoClose: 2500,
     });
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
       toast.error(error.response?.data?.message || "Failed to update service");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Service</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">

        {/* Image Upload */}
        <div className="col-span-12 flex justify-center mb-2">
          <label htmlFor="serviceImage" className="cursor-pointer relative">
            <img
              src={
                form.imagePreview ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Service"
              className="w-28 h-28 rounded-full object-cover border shadow"
            />

            <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 
              text-white flex items-center justify-center opacity-0 
              hover:opacity-100 transition">
              Change Image
            </div>
          </label>

          <input
            id="serviceImage"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {/* Input Fields */}
        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Service Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Category</label>
          <select
            name="category"
            value={form.category}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1 bg-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Ex: 30 min, 45 min"
          />
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          ></textarea>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <label className="font-semibold">Buffer Time</label>
          <input
            type="text"
            name="buffer"
            value={form.buffer}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Ex: 5 min"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-12 flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 bg-blue-600 text-white py-2 font-bold hover:bg-blue-700"
          >
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
