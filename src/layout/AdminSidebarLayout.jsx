import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';

const AdminSidebarLayout = () => {
  const SIDEBAR_WIDTH = 127; // width same as Sidebar

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Right Section */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Box sx={{ height: 64, ml: `${SIDEBAR_WIDTH}px` }}>
          <Navbar />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1,  ml: `${SIDEBAR_WIDTH}px` }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSidebarLayout;
