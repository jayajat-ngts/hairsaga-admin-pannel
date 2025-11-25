import React, { useState } from "react";

// ----------------- FILE UPLOAD COMPONENT -----------------
const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const newFiles = [...event.target.files];
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = [...e.dataTransfer.files];
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center text-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
    >
      <div className="text-4xl text-gray-400">⬆</div>

      <p className="font-semibold mt-2">Choose a file or drag & drop it here</p>
      <p className="text-gray-500 text-sm">
        jpg, png, pdf, docx, xlsx — up to 20MB
      </p>

      <label className="mt-2 px-4 py-1 border rounded-lg text-sm bg-white cursor-pointer shadow-sm">
        Browse Files
        <input
          type="file"
          className="hidden"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xlsx"
          onChange={handleFileUpload}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-3 w-full text-left">
          <p className="text-sm text-gray-700 font-medium mb-1">Uploaded:</p>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ----------------- MAIN PAGE -----------------
export default function AssignTask() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold">Salon Admin Panel</h1>
      <p className="text-gray-500 mb-5">Manage Appointments</p>

      {/* CARD */}
      <div className="bg-white shadow rounded-3xl p-8">

        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          <div>
            <label className="font-semibold block mb-1">Assign to</label>
            <div className="flex items-center border p-2 rounded-lg">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-8 h-8 rounded-full mr-2"
                alt=""
              />
              <select className="w-full outline-none">
                <option>Olivia Chen</option>
                <option>Sarah Lee</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Lead Project</label>
            <div className="flex items-center border p-2 rounded-lg">
              <img
                src="https://randomuser.me/api/portraits/men/70.jpg"
                className="w-8 h-8 rounded-full mr-2"
                alt=""
              />
              <select className="w-full outline-none">
                <option>Disquel Lorenzo</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          <div>
            <label className="font-semibold block mb-1">Task Title</label>
            <input
              type="text"
              placeholder="Research Rodriguez"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Lead Stylist</label>
            <div className="flex items-center border p-2 rounded-lg">
              <img
                src="https://randomuser.me/api/portraits/men/60.jpg"
                className="w-8 h-8 rounded-full mr-2"
                alt=""
              />
              <select className="w-full outline-none">
                <option>David Rodriguez</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= ROW 3 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          <div>
            <label className="font-semibold block mb-1">Appointment Title</label>
            <input
              type="text"
              placeholder="Haircut & Balayage for Sarah Lee"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Services</label>
            <div className="flex flex-wrap gap-2">
              {["Haircut", "Full Color", "Balayage Styling"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ROW 4 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          <div>
            <label className="font-semibold block mb-1">Start Date</label>
            <input
              type="date"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">End Date</label>
            <input
              type="date"
              className="w-full border p-3 rounded-lg"
            />
          </div>
        </div>

        {/* ================= ROW 5 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          <div>
            <label className="font-semibold block mb-1">
              Upload Client Reference Photos
            </label>
            <FileUpload />
          </div>

          <div>
            <label className="font-semibold block mb-1">Notes</label>
            <textarea
              rows="6"
              placeholder="Client wants subtle caramel balayage..."
              className="w-full border p-3 rounded-lg"
            ></textarea>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex justify-between mt-6">
          <button className="border px-6 py-2 rounded-lg hover:bg-gray-100">
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button className="border px-6 py-2 rounded-lg hover:bg-gray-100">
              Reset Data
            </button>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              Save Task
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
