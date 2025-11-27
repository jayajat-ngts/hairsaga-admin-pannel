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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ⭐ Lucide Icons (Perfect Visual Consistency)
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  Users,
  UserPlus,
  Mail,
  LogOut,
  X,
} from "lucide-react";

const SidebarContainer = styled(
  Paper,
  { shouldForwardProp: (prop) => prop !== "inDrawer" }
)(({ theme, inDrawer }) => ({
  width: 260,
  height: "100vh",
  display: inDrawer ? "flex" : "none",

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
    backgroundColor: theme.palette.primary.main + " !important",
    borderLeft: `4px solid ${theme.palette.primary.dark}`,
    color: "#fff !important",
  },

  "&.Mui-selected .MuiListItemIcon-root": {
    color: "#fff !important",
  },

  "&.Mui-selected .MuiTypography-root": {
    color: "#fff !important",
  },

  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    transform: "scale(1.02)",
  },

  transition: "all 0.3s ease",
}));


const Sidebar = ({ inDrawer = false, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} />, path: "dashboard" },
    { text: "Bookings", icon: <CalendarCheck size={20} />, path: "bookings" },
    { text: "Services", icon: <ClipboardList size={20} />, path: "services" },
    { text: "Create Staff", icon: <UserPlus size={20} />, path: "create-staff" },
    { text: "Staff List", icon: <Users size={20} />, path: "staff-list" },
    { text: "Inquiries", icon: <Mail size={20} />, path: "inquiries" },
    { text: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <SidebarContainer inDrawer={inDrawer}>

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
            <X />
          </IconButton>
        </Box>
      )}

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <StyledListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname.includes(item.path)}
              onClick={onClose}
            >
              <ListItemIcon
                className="MuiListItemIcon-root"
                sx={{ minWidth: 40, color: "#555" }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
