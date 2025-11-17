// components/StaffNavbar.jsx

// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
// import {  IconButton } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// const StaffNavbar = () => {
//   return (
//     // <AppBar
//     //   position="fixed"
//     //   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white", color: "black" }}
//     //   elevation={1}
//     // >
//     //   <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//     //     <Typography variant="h6" noWrap component="div">
//     //       Welcome, Staff Member
//     //     </Typography>
//     //     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//     //       <Avatar alt="Staff" src="/avatar.jpg" />
//     //     </Box>
//     //   </Toolbar>
//     // </AppBar>
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         backgroundColor: "white",
//         color: "black",
//         boxShadow: "none", // remove shadow
//         border: "none",    // ensure no border
//         borderTopRightRadius: '16px', // curve top-right corner
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     borderTopLeftRadius: 0,
//       }}
//       elevation={0} // no elevation (shadow)
//     >
//        <IconButton onClick={onToggleSidebar}>
//         <MenuIcon />
//       </IconButton>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6" noWrap component="div">
//           Welcome, Staff Member
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Avatar alt="Staff" src="/avatar.jpg" />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default StaffNavbar;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const StaffNavbar = ({ onToggleSidebar }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderTopRightRadius: "16px",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={onToggleSidebar}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome, Staff Member
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar alt="Staff" src="/avatar.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StaffNavbar;
