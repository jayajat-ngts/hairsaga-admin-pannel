// import React from 'react'

// const StaffDashboard = () => {
//   return (
//     <div>
//     sss
//     </div>
//   )
// }

// export default StaffDashboard

// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   CssBaseline,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
//   Divider,
//   Paper,
//   IconButton,
//   Tooltip,
// } from '@mui/material';

// import {
//   CalendarMonth,
//   Group,
//   Event,
//   MonetizationOn,
//   Message,
//   AccountCircle,
//   Logout,
//   Notifications,
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const todayAppointments = [
//   { time: '10:00 AM', client: 'Alice', service: 'Haircut' },
//   { time: '11:30 AM', client: 'Bob', service: 'Facial' },
//   { time: '2:00 PM', client: 'Charlie', service: 'Massage' },
// ];

// const StatCard = ({ title, value, color }) => (
//   <Card
//     sx={{
//       background: `linear-gradient(135deg, ${color}99, ${color})`,
//       color: '#fff',
//       boxShadow: 3,
//       borderRadius: 2,
//     }}
//   >
//     <CardContent>
//       <Typography variant="subtitle1" fontWeight="bold">
//         {title}
//       </Typography>
//       <Typography variant="h4">{value}</Typography>
//     </CardContent>
//   </Card>
// );

// const StaffDashboard = () => {
//   return (
//     <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
//       <CssBaseline />

//       {/* Top AppBar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           backgroundColor: '#2e2e38',
//         }}
//       >
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6" noWrap component="div">
//             ✂️ Salon Dashboard
//           </Typography>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Tooltip title="Notifications">
//               <IconButton color="inherit">
//                 <Notifications />
//               </IconButton>
//             </Tooltip>
//             <Avatar alt="Emma Staff" src="https://i.pravatar.cc/150?img=47" />
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#f9f9f9',
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {[
//               { text: 'Dashboard', icon: <CalendarMonth /> },
//               { text: 'Appointments', icon: <Event /> },
//               { text: 'Clients', icon: <Group /> },
//               { text: 'Earnings', icon: <MonetizationOn /> },
//               { text: 'Messages', icon: <Message /> },
//               { text: 'Profile', icon: <AccountCircle /> },
//               { text: 'Logout', icon: <Logout /> },
//             ].map(({ text, icon }) => (
//               <ListItem button key={text} sx={{ '&:hover': { backgroundColor: '#eee' } }}>
//                 <ListItemIcon sx={{ color: '#555' }}>{icon}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
//         <Toolbar />

//         {/* Welcome Header */}
//         <Box mb={4}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             👋 Welcome back, Emma!
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Here's your dashboard overview for <strong>Thursday</strong>, keep shining!
//           </Typography>
//         </Box>

//         <Grid container spacing={3}>
//           {/* Stats */}
//           <Grid item xs={12} sm={4}>
//             <StatCard title="Clients Today" value="8" color="#00bfa5" />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <StatCard title="Earnings" value="₹3,500" color="#ff7043" />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <StatCard title="Services Completed" value="6" color="#5c6bc0" />
//           </Grid>

//           {/* Appointments */}
//           <Grid item xs={12} md={7}>
//             <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold">
//                 📅 Today's Appointments
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               {todayAppointments.map((apt, idx) => (
//                 <Box
//                   key={idx}
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     py: 1.2,
//                     borderBottom: '1px solid #eee',
//                   }}
//                 >
//                   <Typography>
//                     <strong>{apt.time}</strong> — {apt.client}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {apt.service}
//                   </Typography>
//                   <Button variant="outlined" size="small">
//                     Details
//                   </Button>
//                 </Box>
//               ))}
//             </Paper>
//           </Grid>

//           {/* Calendar and Notifications */}
//           <Grid item xs={12} md={5}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Card sx={{ p: 2, borderRadius: 2 }}>
//                   <Typography variant="h6" gutterBottom fontWeight="bold">
//                     🗓 Schedule Preview
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Weekly calendar goes here (use FullCalendar or MUI pickers).
//                   </Typography>
//                 </Card>
//               </Grid>

//               <Grid item xs={12}>
//                 <Card sx={{ p: 2, borderRadius: 2 }}>
//                   <Typography variant="h6" gutterBottom fontWeight="bold">
//                     🔔 Notifications
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     - New booking from Sarah<br />
//                     - 3:00 PM appointment rescheduled<br />
//                     - Positive review from Alice ⭐
//                   </Typography>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
   
//   );
// };

// export default StaffDashboard;

// import React from 'react';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Paper,
//   Button,
//   Divider,
// } from '@mui/material';

// const todayAppointments = [
//   { time: '10:00 AM', client: 'Alice', service: 'Haircut' },
//   { time: '11:30 AM', client: 'Bob', service: 'Facial' },
//   { time: '2:00 PM', client: 'Charlie', service: 'Massage' },
// ];

// const StatCard = ({ title, value, color }) => (
//   <Card
//     sx={{
//       background: `linear-gradient(135deg, ${color}99, ${color})`,
//       color: '#fff',
//       boxShadow: 3,
//       borderRadius: 2,
//     }}
//   >
//     <CardContent>
//       <Typography variant="subtitle1" fontWeight="bold">
//         {title}
//       </Typography>
//       <Typography variant="h4">{value}</Typography>
//     </CardContent>
//   </Card>
// );

// const StaffDashboard = () => {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         width: '100vw',
//         overflowY: 'auto',
//         backgroundColor: '#f4f6f8',
//         p: 4,
//         fontFamily: 'Poppins, sans-serif',
//       }}
//     >
//       {/* Welcome Header */}
//       <Box mb={4}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           👋 Welcome back, Emma!
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Here's your dashboard overview for <strong>Thursday</strong>, keep shining!
//         </Typography>
//       </Box>
      
//       <Grid container direction="column" spacing={2} spacing={4}>
//         {/* Stat Cards */}
//         {/* <Grid  spacing={2}>
//         <Grid item xs={12} sm={4}>
//           <StatCard title="Clients Today" value="8" color="#00bfa5" />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <StatCard title="Earnings" value="₹3,500" color="#ff7043" />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <StatCard title="Services Completed" value="6" color="#5c6bc0" />
//         </Grid>
//         </Grid> */}
//         <Grid container spacing={4} 
//          sx={{ mt: 2, ml: 0 }} // remove left margin
//         justifyContent="flex-start" >
//        <Grid item xs={12} sm={6} md={3}>
//       <StatCard title="Clients Today" value="8" color="#00bfa5" />
//      </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//      <StatCard title="Earnings" value="₹3,500" color="#ff7043" />
//      </Grid>
//      <Grid item xs={12} sm={6} md={3}>
//       <StatCard title="Services Completed" value="6" color="#5c6bc0" />
//      </Grid>
//     </Grid>

//         {/* Appointments Section */}
//         <Grid item xs={12} md={7} 
//         Grid container spacing={4} 
//          sx={{ mt: 2, ml: 0 }} // remove left margin
//         justifyContent="flex-start">
//           <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom fontWeight="bold">
//               📅 Today's Appointments
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             {todayAppointments.map((apt, idx) => (
//               <Box
//                 key={idx}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   py: 1.2,
//                   borderBottom: '1px solid #eee',
//                 }}
//               >
//                 <Typography>
//                   <strong>{apt.time}</strong> — {apt.client}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {apt.service}
//                 </Typography>
//                 <Button variant="outlined" size="small">
//                   Details
//                 </Button>
//               </Box>
//             ))}
//           </Paper>
//         </Grid>

//         {/* Schedule + Notifications */}
//         <Grid item xs={12} md={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Card sx={{ p: 2, borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom fontWeight="bold">
//                   🗓 Schedule Preview
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Weekly calendar goes here (use FullCalendar or MUI Date Picker).
//                 </Typography>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card sx={{ p: 2, borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom fontWeight="bold">
//                   🔔 Notifications
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   - New booking from Sarah<br />
//                   - 3:00 PM appointment rescheduled<br />
//                   - Positive review from Alice ⭐
//                 </Typography>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StaffDashboard;
// src/pages/Dashboard.js

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { AiOutlineCalendar } from "react-icons/ai"; 
import {  AiOutlineTeam } from "react-icons/ai"; 
import {AiOutlineUserAdd } from "react-icons/ai"; 
import {AiOutlineUser  } from "react-icons/ai"; 

// Sample data
const data = [
  { name: "Sat", newClients: 60, returningClients: 30 },
  { name: "Sun", newClients: 80, returningClients: 50 },
  { name: "Mon", newClients: 70, returningClients: 40 },
  { name: "Tue", newClients: 100, returningClients: 40 },
  { name: "Wed", newClients: 55, returningClients: 35 },
  { name: "Thu", newClients: 65, returningClients: 45 },
  { name: "Fri", newClients: 60, returningClients: 40 },
];

const stratificationData = [
  { name: "Regulars", value: 50, color: "#5472F4" },
  { name: "VIP Clients", value: 30, color: "#FF8B7B" },
  { name: "New Clients", value: 20, color: "#FEB95F" },
];

const appointments = [
  {
    time: "09:00 AM",
    service: "Haircut",
    expected: "09:30 AM",
    client: "Alice Brown",
    employee: "John Doe",
    status: "Paid",
  },
  {
    time: "10:00 AM",
    service: "Beard Trim",
    expected: "10:15 AM",
    client: "Bob White",
    employee: "Jane Smith",
    status: "Pending",
  },
];
const summaryCards = [
  { label: "Total Clients", value: 260, change: "+10%", color: "green", Icon: AiOutlineUser },
  { label: "New Clients", value: 45, change: "+15%", color: "green", Icon: AiOutlineUserAdd, },
  { label: "Total Employees", value: 20, change: "+20%", color: "green", Icon: AiOutlineTeam, },
  { label: "Appointments", value: 43, change: "-43%", color: "red", Icon: AiOutlineCalendar },
];

const StaffDashboard = () => {
  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* Summary Cards
      <Grid container spacing={4}>
        {[
          { label: "Total Clients", value: 260, change: "+10%", color: "green",icon: <AiOutlineCalendar size={24} />  },
          { label: "New Clients", value: 45, change: "+15%", color: "green",icon: <AiOutlineCalendar size={24} />  },
          { label: "Total Employees", value: 20, change: "+20%", color: "green" ,icon: <AiOutlineCalendar size={24} />   },
          { label: "Appointments", value: 43, change: "-43%", color: "red" , Icon: AiOutlineCalendar, },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2, width:200}}>
            
              <CardContent>
                   <Box display="flex" alignItems="center" gap={1} mb={1}>
            <item.Icon size={28} color="#4a4a4a" />
            <Typography variant="subtitle2">{item.label}</Typography>
          </Box>
                <Typography variant="h4" fontWeight="bold">{item.value}</Typography>
                <Typography variant="body2" color={item.color}>{item.change}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={4}>
      {summaryCards.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ p: 2, width:240,borderRadius: 3, boxShadow: 3}} >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <item.Icon size={28} color="#4a4a4a" />
                <Typography variant="subtitle2">{item.label}</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">{item.value}</Typography>
              <Typography variant="body2" sx={{ color: item.color }}>{item.change}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      {/* Charts */}
      <Grid container spacing={4} mt={1}>
        {/* Clients Growth Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4, boxShadow: 1, height: 480, p: 2, width: 700 }}>
            <CardContent sx={{ height: "100%" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Clients Growth
                  </Typography>
                  <Typography variant="subtitle2">
                    Total: <strong>100</strong>
                  </Typography>
                </Box>

                <Select size="small" defaultValue="weekly">
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </Box>

              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 120]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="newClients" name="New Clients" fill="#6F88FC" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returningClients" name="Returning Clients" fill="#D8DFFB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Stratification */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 4, p: 2, minHeight: 480, width:350}}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Customer Stratification</Typography>
                <Button size="small" sx={{ textTransform: "none" }}>All Time</Button>
              </Box>

              <ResponsiveContainer width="100%" height={200} >
              
                <PieChart>
                  
                  <Pie
                    data={stratificationData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={70}
                    label
                  > 
                    {stratificationData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                     
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {stratificationData.map((entry) => (
                <Typography key={entry.name} variant="body2" sx={{ mt: 1 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      backgroundColor: entry.color,
                      marginRight: 8,
                      borderRadius: "50%",
                    }}
                  />
                  {entry.name} - {entry.value}%
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments Table */}
       <Grid container justifyContent="center">
  <Grid item xs={12} md={11} lg={10}>
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 2,
        maxWidth: '100%',
        mx: 'auto',
        overflowX: 'auto',
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2}>
          Service Appointment List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  sx={{ px: 6 }}>Start Time</TableCell>
                <TableCell  sx={{ px: 6 }}>Services</TableCell>
                <TableCell  sx={{ px: 6}}>Time Expected</TableCell>
                <TableCell  sx={{ px: 6}}>Client</TableCell>
                <TableCell  sx={{ px:  6}}>Employee</TableCell>
                <TableCell  sx={{ px: 6 }}>Status</TableCell>
                <TableCell sx={{ px: 6 }}> Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ px: 6 }}>{row.time}</TableCell>
                  <TableCell sx={{ px: 6 }}>{row.service}</TableCell>
                  <TableCell sx={{ px: 6 }}>{row.expected}</TableCell>
                  <TableCell sx={{ px: 6 }}>{row.client}</TableCell>
                  <TableCell sx={{ px: 6 }}>{row.employee}</TableCell>
                  <TableCell sx={{ px: 6 }}>
                    <Chip 
                      label={row.status}
                      color={row.status === "Paid" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Grid>
</Grid>

      </Grid>
    </Box>
  );
};

export default StaffDashboard;
