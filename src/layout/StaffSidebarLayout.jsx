// ✅ CORRECT COMPONENT NAME
// import { Box } from "@mui/material";
// import React from "react";
// import StaffNavbar from "../staffcomponents/StaffNavbar";
// import StafffSidebar from "../staffcomponents/StafffSidebar";
// import { Outlet } from "react-router-dom";
// const StaffSidebarLayout = () => {
//   const SIDEBAR_WIDTH = 127;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
//         {/* <StaffSideba/> */}
//         <StafffSidebar />
//       </Box>

//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ height: 64, ml: `${SIDEBAR_WIDTH}px` }}>
//           <StaffNavbar />
//         </Box>
//         <Box sx={{ flexGrow: 1, ml: `${SIDEBAR_WIDTH}px` }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default StaffSidebarLayout;

import { Box } from "@mui/material";
import React, { useState } from "react";
import StaffNavbar from "../staffcomponents/StaffNavbar";
import StafffSidebar from "../staffcomponents/StafffSidebar";
import { Outlet } from "react-router-dom";

const StaffSidebarLayout = () => {
  const SIDEBAR_WIDTH = 200;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            transition: 'width 0.3s ease',
          }}
        >
          <StafffSidebar />
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Box sx={{ height: 64 }}>
          <StaffNavbar onToggleSidebar={toggleSidebar} />
        </Box>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StaffSidebarLayout;

