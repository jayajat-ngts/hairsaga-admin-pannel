// components/StaffSidebar.jsx
import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Dashboard, CalendarMonth, Assignment, AccountCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/staff/dashboard" },
  { label: "Bookings", icon: <CalendarMonth />, path: "/staff/bookings" },
  { label: "Tasks", icon: <Assignment />, path: "/staff/tasks" },
  { label: "Profile", icon: <AccountCircle />, path: "/staff/profile" },
];

const StaffSidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", },
      }}
    >
      <Toolbar sx={{ fontWeight: 'bold', color: '#7e22ce', fontSize: '1.5rem' }}>
        Staff Panel
      </Toolbar>
      <List>
        {navItems.map(({ label, icon, path }) => (
          <ListItem
            button
            key={label}
            component={Link}
            to={path}
            selected={location.pathname === path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#ede9fe',
                color: '#7e22ce',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === path ? '#7e22ce' : 'inherit' }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default StaffSidebar;
