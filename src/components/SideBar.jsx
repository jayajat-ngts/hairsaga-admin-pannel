import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  Divider,
  IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";

// ⭐ Prevent inDrawer from going to DOM
const SidebarContainer = styled(
  Paper,
  { shouldForwardProp: (prop) => prop !== "inDrawer" }
)(({ theme, inDrawer }) => ({
  width: 260,
  height: "100vh",

  // FIX for mobile
  display: inDrawer ? "flex" : "none",

  // Desktop only
  [theme.breakpoints.up("md")]: {
    display: "flex",
    position: inDrawer ? "relative" : "fixed",
  },

  top: 0,
  left: 0,
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));



const ProfileBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.02)",
  },
  transition: "all 0.3s ease",
}));

const Sidebar = ({ inDrawer = false, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
    { text: "Bookings", icon: <BookOnlineIcon />, path: "bookings" },
    { text: "Services", icon: <MiscellaneousServicesIcon />, path: "services" },
    { text: "Create Staff", icon: <PeopleAltIcon />, path: "create-staff" },
    { text: "Assign Task", icon: <AssignmentIcon />, path: "assign-task" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  return (
    <SidebarContainer inDrawer={inDrawer}>
      
      {/* Profile */}
      <ProfileBox>
        <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Admin User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administrator
          </Typography>
        </Box>
      </ProfileBox>

      {/* ⭐ Mobile Close Button */}
      {inDrawer && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            px: 2,
            py: 1,
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Divider />

      {/* Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <StyledListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname.includes(item.path)}
              onClick={onClose} // ⭐ Auto close drawer when clicking menu
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

    </SidebarContainer>
  );
};

export default Sidebar;
