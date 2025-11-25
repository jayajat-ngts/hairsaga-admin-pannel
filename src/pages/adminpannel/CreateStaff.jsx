import React, { useState } from "react";
import axios from "axios";
import { createStaff } from "../../api/staff";

const roles = ["Hair Stylist", "Receptionist", "Manager", "Therapist"];
const statuses = ["Active", "Inactive"];
const genders = ["Male", "Female", "Other"];

const CreateStaff = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    joinDate: "",
    role: "",
    status: "Active",
    experience: "",
    address: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", type: "success" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const showSnack = (message, type) => {
    setSnack({ open: true, message, type });
    setTimeout(() => setSnack({ open: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneCheck = /^\d{10}$/;

    if (!emailCheck.test(form.email)) return showSnack("Invalid Email Format", "warning");
    if (!phoneCheck.test(form.phone))
      return showSnack("Phone must be 10 digits", "warning");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    setLoading(true);

    try {
   const res=await createStaff(data);
      showSnack("Staff Created Successfully", "success");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        dob: "",
        joinDate: "",
        role: "",
        status: "Active",
        experience: "",
        address: "",
        image: null,
      });
    } catch (err) {
      showSnack("Error creating staff", "error");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4">
      {/* Snackbar */}
      {snack.open && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white 
          ${snack.type === "success" ? "bg-green-600" : snack.type === "warning" ? "bg-yellow-500" : "bg-red-600"}`}
        >
          {snack.message}
        </div>
      )}

      {/* Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">New Staff Member</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">

          <div className="col-span-12 flex justify-center mb-4">
            <label htmlFor="profilePic" className="cursor-pointer relative">

              <img
                src={
                  form.image
                    ? URL.createObjectURL(form.image)
                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border shadow"
              />

              {/* Overlay */}
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 
          text-white flex items-center justify-center opacity-0 
          hover:opacity-100 transition">
                {form.image ? "Change Picture" : "Choose Picture"}
              </div>

            </label>

            <input
              id="profilePic"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setForm({ ...form, image: file });
              }}
              className="hidden"
            />
          </div>

          {/* Input Fields */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              required
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter full name"
            />
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter email"
            />
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="10 digit number"
            />
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Create password"
            />
          </div>

          {/* Gender */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 bg-white"
            >
              <option value="">Select Gender</option>
              {genders.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* DOB */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Join Date */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Joining Date</label>
            <input
              type="date"
              name="joinDate"
              required
              value={form.joinDate}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Role */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Role</label>
            <select
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 bg-white"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 bg-white"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div className="col-span-12 sm:col-span-6">
            <label className="font-semibold">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Years of experience"
            />
          </div>

          {/* Address */}
          <div className="col-span-12">
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter address"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-4 hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create Staff"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
