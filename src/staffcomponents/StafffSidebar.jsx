// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Box,
//   Typography,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const drawerWidth = 240;

// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon />, active: true },
//   { text: "Calendar", icon: <CalendarMonthIcon /> },
//   { text: "Tasks", icon: <AssignmentIcon /> },
//   { text: "Profile", icon: <AccountCircleIcon /> },
// ];

// const StafffSidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: "#ffffff", // white background
//           color: "#000000",           // black text
//           borderRight: "1px solid #ddd",

//          borderRadius: "20px",
//         },
//       }}
//     >
//       <Toolbar>
//         <Typography variant="h6" noWrap sx={{ color: "#000000" }}>
//           MyApp
//         </Typography>
//       </Toolbar>
//       <Box sx={{ overflow: "auto" }}>
//         <List>
//           {menuItems.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton
//                 sx={{
//                     mx: 2,
//                     my: 1,
//                     borderRadius: "12px",
//                     // border: "1px solid #ccc",
//                     transition: "all 0.2s",
//                   "&:hover": {
//                     backgroundColor: "#f3e5f5", // purple hover
//                     color: "#000000",           // white text on hover
//                     "& .MuiListItemIcon-root": {
//                       color: "#000000",
//                     },
//                   },
//                   color: "#000000", // default black text
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "#000000" }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default StafffSidebar;

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const drawerWidth = 240;

const StafffSidebar = () => {
  const theme = useTheme();

  const [openDashboard, setOpenDashboard] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        p: 1,
      
      }}
    >
      {/* <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            color: "#000000",
             borderTopRightRadius: '16px', // curve top-left corner
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
            // borderRadius: "20px",
            // borderRadius:"rounded-ful",
            margin: "10px",
            // boxShadow: theme.shadows[4],
          },
        }}
      > */}
      <Drawer
  variant="permanent"
  anchor="left"
  open={open} // only needed if using custom logic to toggle
  sx={{
    width: open ? drawerWidth : 72, // collapsed width
    flexShrink: 0,
    transition: 'width 0.3s ease',
    [`& .MuiDrawer-paper`]: {
      width: open ? drawerWidth : 72,
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      color: '#000000',
      transition: 'width 0.3s ease',
      borderTopRightRadius: '16px',
      borderBottomRightRadius: '16px',
      margin: '10px',
      overflowX: 'hidden',
    },
  }}
>
  {/* Sidebar content */}

        <Toolbar>
          <Typography variant="h6" noWrap sx={{ color: "#000000" }}>
            MyApp
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Dashboard Dropdown */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setOpenDashboard(!openDashboard)}
                sx={buttonStyle}
              >
                <ListItemIcon sx={iconStyle}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                {openDashboard ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openDashboard} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="Overview" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="Stats" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Calendar Dropdown */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setOpenCalendar(!openCalendar)}
                sx={buttonStyle}
              >
                <ListItemIcon sx={iconStyle}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
                {openCalendar ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCalendar} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="View Calendar" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="Create Event" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Tasks Dropdown */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setOpenTasks(!openTasks)}
                sx={buttonStyle}
              >
                <ListItemIcon sx={iconStyle}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
                {openTasks ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openTasks} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="All Tasks" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="New Task" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Profile Dropdown */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setOpenProfile(!openProfile)}
                sx={buttonStyle}
              >
                <ListItemIcon sx={iconStyle}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                {openProfile ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openProfile} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={subItemStyle}>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

// 🎨 Shared styles
const buttonStyle = {
  mx: 2,
  my: 1,
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#D8DFFB",
    border: "1px solid #f3e5f5",
    color: "black",
    "& .MuiListItemIcon-root": {
      color: "black",
    },
  },
  "&:not(:hover)": {
    border: "1px solid transparent",
  },
  color: "rgba(0, 0, 0, 0.69)",
};

const subItemStyle = {
  ml: 4,
  my: 0.5,
  borderRadius: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#D8DFFB",
    border: "1px solid #f3e5f5",
    color: "black",
    "& .MuiListItemIcon-root": {
      color: "black",
    },
  },
  "&:not(:hover)": {
    border: "1px solid transparent",
  },
  color: "rgba(0, 0, 0, 0.69)",
};

const iconStyle = {
  color: "#000000",
  minWidth: 36,
};

export default StafffSidebar;
