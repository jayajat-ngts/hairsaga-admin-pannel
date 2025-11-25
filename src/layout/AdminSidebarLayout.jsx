// AdminSidebarLayout.jsx

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";

export default function AdminSidebarLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* DESKTOP SIDEBAR */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      {/* MOBILE DRAWER SIDEBAR */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Sidebar inDrawer={true} onClose={() => setDrawerOpen(false)} />
      </Drawer>

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, ml: { md: "260px" } }}>
        
        {/* Navbar contains the mobile menu button */}
        <Navbar onMenuClick={() => setDrawerOpen(true)} />

        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
