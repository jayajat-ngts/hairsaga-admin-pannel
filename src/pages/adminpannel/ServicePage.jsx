import React, { useState } from "react";
import { toast } from "react-toastify";
import { createService } from "../../api/service";
import { useNavigate } from "react-router-dom";

const categories = [
    "Hair",
    "Skin",
    "Makeup",
    "Body",
    "Waxing",
    "Nail",
    "Spa",
    "Packages"
];

const ServicePage = () => {
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: "",
        buffer: "",
        image: null,
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("price", form.price);
    data.append("duration", form.duration);
    data.append("description", form.description);
    data.append("buffer", form.buffer);
    data.append("image", form.image);

    try {
        const res = await createService(data);

        toast.success("Service Added Successfully!", {
            position: "top-right",
            autoClose: 2500,
        });

        setForm({
            name: "",
            category: "",
            price: "",
            duration: "",
            description: "",
            buffer: "",
            image: null,
        });
          setTimeout(() => {
            navigate("/admin/services");
        }, 400);

    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add service");
    }
};

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Service</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">

                {/* Image Upload */}
                <div className="col-span-12 flex justify-center mb-2">
                    <label htmlFor="serviceImage" className="cursor-pointer relative">

                        <img
                            src={
                                form.image
                                    ? URL.createObjectURL(form.image)
                                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            }
                            alt="Service Preview"
                            className="w-28 h-28 rounded-full object-cover border shadow"
                        />

                        <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 
                text-white flex items-center justify-center opacity-0 
                hover:opacity-100 transition">
                            {form.image ? "Change Image" : "Choose Image"}
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

                {/* Inputs */}
                <div className="col-span-12 sm:col-span-6">
                    <label className="font-semibold">Service Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        required
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Enter service name"
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
                        placeholder="Enter price"
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
                        placeholder="Enter service description"
                    ></textarea>
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <label className="font-semibold">Buffer Time (After Service)</label>
                    <input
                        type="text"
                        name="buffer"
                        value={form.buffer}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="Ex: 5 min, 10 min"
                    />
                </div>

                {/* Submit Button */}
                {/* Buttons Row */}
                <div className="col-span-12 flex justify-between mt-4">

                    {/* Cancel (Right as per your screenshot) */}
                    <button
                        type="button"
                        className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    {/* Add Service (Left side) */}
                    <button
                        type="submit"
                        className="px-8 bg-blue-600 text-white py-2  font-bold hover:bg-blue-700 transition"
                    >
                        Add Service
                    </button>

                </div>


            </form>
        </div>
    );
};

export default ServicePage;
