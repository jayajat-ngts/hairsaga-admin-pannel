import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebarLayout from '../layout/AdminSidebarLayout';
import StaffSidebarLayout from '../layout/StaffSidebarLayout';
import Dashboard from '../pages/adminpannel/Dashboard';
import Bookings from '../pages/adminpannel/Bookings';
import Services from '../pages/adminpannel/Services';
import StaffDashboard from '../pages/staffpanel/StaffDashboard';
import StaffTasks from '../pages/staffpanel/StaffTasks';
import StaffProfile from '../pages/staffpanel/StaffProfile';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoutes';
import CreateStaff from '../pages/adminpannel/CreateStaff';
import AssignTask from '../pages/adminpannel/AssignTask';

const Routeing = () => {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />


      <Route >
        <Route path="/admin" element={<AdminSidebarLayout />}>
          <Route path="dashboard" element={<Dashboard  />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="services" element={<Services />} />
          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="assign-task" element={<AssignTask />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      <Route >
        <Route path="/staff" element={<StaffSidebarLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="tasks" element={<StaffTasks />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes></>
  );
};

export default Routeing;
