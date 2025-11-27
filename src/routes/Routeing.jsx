import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminSidebarLayout from '../layout/AdminSidebarLayout';
import StaffSidebarLayout from '../layout/StaffSidebarLayout';

// Admin Pages
import Dashboard from '../pages/adminpannel/Dashboard';
import Bookings from '../pages/adminpannel/Bookings';
import Services from '../pages/adminpannel/Services';
import CreateStaff from '../pages/adminpannel/CreateStaff';
import AssignTask from '../pages/adminpannel/AssignTask';
import ServicePage from '../pages/adminpannel/ServicePage';  // ✅ Add Service Page Route

// Staff Pages
import StaffDashboard from '../pages/staffpanel/StaffDashboard';
import StaffTasks from '../pages/staffpanel/StaffTasks';
import StaffProfile from '../pages/staffpanel/StaffProfile';

// Login
import Login from '../pages/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Rigester from '../pages/rigester';
import EditService from '../pages/adminpannel/EditServices';
import StaffList from '../pages/adminpannel/StaffList';
import InquiryPage from '../pages/adminpannel/Inquiry';

const Routeing = () => {
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
         
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Rigester />}/>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminSidebarLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="services" element={<Services />} />

          {/* ✔ Add Service Page (NOT shown in sidebar, but route works) */}
          <Route path="add-service" element={<ServicePage />} />

          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="staff-list" element={<StaffList />} />

          <Route path="assign-task" element={<AssignTask />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="inquiries" element={<InquiryPage />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffSidebarLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="tasks" element={<StaffTasks />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Any unknown URL → redirect login */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </>
  );
};

export default Routeing;
