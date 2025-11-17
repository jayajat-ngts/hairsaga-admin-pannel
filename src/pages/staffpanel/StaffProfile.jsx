// import React from 'react'

// const StaffProfile = () => {
//   return (
//     <div>
// ddddd
//     </div>
//   )
// }

// export default StaffProfile

// import React from 'react';
// import "../../index.css";

// import {
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   Paper,
//   Divider,
//   Chip,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';

// import PhoneIcon from '@mui/icons-material/Phone';
// import ChatIcon from '@mui/icons-material/Chat';

// const InfoRow = ({ label, value }) => (
//   <Box display="flex" justifyContent="space-between" alignItems="center">
//     <Typography fontWeight={600}>{label}</Typography>
//     <Typography variant="body2" color="text.secondary">
//       {value}
//     </Typography>
//   </Box>
// );

// const timeSlots = [
//   '09:00 A.M', '10:00 A.M', '11:00 A.M',
//   '12:00 P.M', '01:00 P.M', '02:00 P.M',
// ];

// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// const dataMatrix = [
//   [4, 3, 2, 3, 1, 2],
//   [3, 2, 4, 2, 1, 1],
//   [2, 3, 4, 4, 2, 3],
//   [1, 2, 3, 2, 4, 3],
//   [3, 2, 1, 1, 2, 3],
//   [2, 3, 4, 2, 3, 4],
//   [4, 4, 3, 2, 3, 4],
// ];

// const StaffProfile = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f3f7fb' }}>
//       {/* Flex Row */}
//       <Box
//         display="flex"
//         flexDirection={{ xs: 'column', md: 'row' }}
//         gap={3}
//         alignItems="stretch"
//       >
//         {/* Profile Card */}
//         <Paper
//           elevation={2}
//           sx={{
//             borderRadius: 4,
//             p: 3,
//             width: { xs: '100%', md: '65%' },
//           }}
//         >
//           <Box display="flex" justifyContent="flex-end">
//             <Box>✎</Box>
//           </Box>

//           <Box display="flex" gap={2} sx={{ width: '50%' }}>
//             <Avatar
//               src="https://randomuser.me/api/portraits/women/44.jpg"
//               sx={{ width: 100, height: 100 }}
//             />
//             <Box display="flex" flexDirection="column" justifyContent="center">
//               <Chip label="Available" color="success" />
//               <Typography variant="h6" mt={1}>Nola Hawkins</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Receptionist · 30 yrs old
//               </Typography>
//               <Box mt={2} display="flex" gap={1}>
//                 <Button variant="contained" startIcon={<PhoneIcon />}>
//                   Call
//                 </Button>
//                 <Button variant="outlined" startIcon={<ChatIcon />}>
//                   Chat
//                 </Button>
//               </Box>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 3 }} />

//           <Box display="flex" flexDirection="column" gap={2}>
//             <InfoRow label="Gender" value="Female" />
//             <InfoRow label="Email" value="kathryn.murp@example.com" />
//             <InfoRow label="Phone" value="(704) 555-0127" />
//             <InfoRow label="Address" value="6391 Elgin St. Celina, Delaware 10299" />
//             <InfoRow label="Joining date" value="March 15, 2020" />
//             <Box mt={2}>
//               <Typography fontWeight={600}>Professional summary</Typography>
//               <Typography variant="body2" color="text.secondary" mt={1}>
//                 Kathryn is a highly dedicated receptionist with 4+ years of experience
//                 ensuring smooth front-desk operations and patient scheduling.
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>

//         {/* Shift Card */}
        
//         <Box 
//   display="flex" 
//   flexDirection="row" 
//   gap={2} 
//   flexWrap="wrap" // optional, helps with responsiveness
// >
//   {/* Today's Shift Card */}
//   <Paper
//     elevation={2}
//     sx={{
//       borderRadius: 4,
//       p: 3,
//       width: { xs: '100%', md: '400px' },
//       height: "200px",
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       gap: 2,
//     }}
//   >
//     <Typography variant="h6" fontWeight={600}>
//       Today's shift
//     </Typography>
//     <Box display="flex" justifyContent="space-between" alignItems="center">
//       <Box>
//         <Typography variant="body2">Shift</Typography>
//         <Typography variant="h6">9AM - 2PM</Typography>
//       </Box>
//       <Box>
//         <Typography variant="body2">Duration</Typography>
//         <Typography variant="h6">5 hours</Typography>
//       </Box>
//       <Box>
//         <Typography variant="body2">Timer</Typography>
//         <Typography variant="h6" color="primary">
//           04h : 10m : 30s
//         </Typography>
//       </Box>
//     </Box>
//     <Button variant="outlined" color="error">
//       Clock Out
//     </Button>
//   </Paper>

//   {/* Attendance Report Card */}
//   <Paper 
//     className="attendance-card" 
//     elevation={2} 
//     sx={{ 
//       borderRadius: 4, 
//       p: 3, 
//       width: { xs: '100%', md: '400px' } 
//     }}
//   >
//     <Typography variant="h6" className="title">Attendance report</Typography>
//     <Typography variant="body2" className="subtitle">
//       Tracks attendance and punctuality efficiently.
//     </Typography>

//     <Box className="legend">
//       <span>Less</span>
//       <span className="dot level-1" />
//       <span className="dot level-2" />
//       <span className="dot level-3" />
//       <span className="dot level-4" />
//       <span>Full</span>
//     </Box>

//     <Box className="attendance-grid">
//       <Box className="time-labels">
//         {timeSlots.map((slot, idx) => (
//           <span key={idx}>{slot}</span>
//         ))}
//       </Box>

//       <Box className="days-grid">
//         {days.map((day, dayIdx) => (
//           <Box className="day-column" key={dayIdx}>
//             <strong>{day}</strong>
//             {dataMatrix[dayIdx].map((level, i) => (
//               <Box key={i} className={`cell level-${level}`} />
//             ))}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   </Paper>
// </Box>


//       {/* Attendance Report */}
//      </Box>
    
//   );
// };

// export default StaffProfile;
import React from 'react';
import "../../index.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiIcon from '@mui/icons-material/Wifi';

import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography fontWeight={600}>{label}</Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Box>
);

const timeSlots = [
  '09:00 A.M', '10:00 A.M', '11:00 A.M',
  '12:00 P.M', '01:00 P.M', '02:00 P.M',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const dataMatrix = [
  [4, 3, 2, 3, 1, 2],
  [3, 2, 4, 2, 1, 1],
  [2, 3, 4, 4, 2, 3],
  [1, 2, 3, 2, 4, 3],
  [3, 2, 1, 1, 2, 3],
  [2, 3, 4, 2, 3, 4],
  [4, 4, 3, 2, 3, 4],
];

const StaffProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const tasks = [
    {
      time: '09:00 – 10:00 AM',
      title: 'Morning check-in & patient Queue',
      description: 'Greet patients, log arrivals, prepare forms',
    },
    {
      time: '10:00 – 12:00 AM',
      title: 'Front desk operations',
      description: 'Handle calls, manage bookings, assist walk-ins',
    },
  ];
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f3f7fb' }}>
     <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
        alignItems="stretch"
      >
        {/* Profile Card */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            p: 3,
            width: { xs: '100%', md: '50%' },
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <Box>✎</Box>
          </Box>

          <Box display="flex" gap={2} justifyContent="space-between" width='50%'>
            <Avatar
              src="https://randomuser.me/api/portraits/women/44.jpg"
             sx={{
               width: 200,
                height: 200,
                borderRadius: 2, // rounded corners, not full circle
                 objectFit: 'cover',
                 boxShadow: 3,
                 }}
            />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Button
                       variant="outlined"
                       color="success"
                       sx={{ borderRadius: "999px" }}
                        >
                    Available
                  </Button>
              <Typography variant="h6" mt={1}>Nola Hawkins</Typography>
              <Typography variant="body2" color="text.secondary">
                Receptionist · 30 yrs old
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button variant="contained" startIcon={<PhoneIcon />} sx={{borderRadius:"999px"}}>
                  Call
                </Button>
                <Button variant="outlined" startIcon={<ChatIcon />} sx={{borderRadius:"999px"}}>
                  Chat
                </Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" flexDirection="column" gap={6}>
             
      <InfoRow label="Gender" value="Female" />
      <InfoRow label="Email" value="kathryn.murp@example.com" />
      <InfoRow label="Phone" value="(704) 555-0127" />
      <InfoRow label="Address" value="6391 Elgin St. Celina, Delaware 10299" />
      <InfoRow label="Joining date" value="March 15, 2020" />
   
            <Box mt={2}>
              <Typography fontWeight={600}>Professional summary</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Kathryn is a highly dedicated receptionist with 4+ years of experience
                ensuring smooth front-desk operations and patient scheduling.
              </Typography>
            </Box>
          </Box>
        </Paper>




        {/* Shift and Attendance Cards */}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width={{ xs: '100%', md: '50%' }}
        >
          <Paper
            elevation={2}
            sx={{
              borderRadius: 4,
              p: 3,
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {/* <Typography variant="h6" fontWeight={600}>
              Today's shift
            </Typography> */}
            <Box  display="flex" justifyContent="space-between" width="40%">
              <Box>
                <Typography variant="body2"> 
                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />Today's shift</Typography>
                <Typography variant="h6">
                
                  9AM - 2PM</Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  <WifiIcon sx={{ fontSize: 16, mr: 0.5 }} />Duration</Typography>
                <Typography variant="h6">5 hours</Typography>
              </Box>
             </Box>
             <Box display="flex" justifyContent="space-between" alignItems="center">
               <Box>
                <Typography variant="body2">Timer</Typography>
                <Typography variant="h5" color="primary">
                  04h : 10m : 30s
                </Typography>
              </Box>
            <Button variant="outlined" color="error" sx={{borderRadius:"999px"}}>
              Clock Out
            </Button>
            </Box>
          </Paper>
           <Box width='100%'>
          <Paper
            className="attendance-card"
            elevation={2}
            sx={{
              borderRadius: 4,
              p: 3,
              width: '100%',
            }}
          >
            <Typography variant="h6" className="title">Attendance report</Typography>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography variant="body2" className="subtitle">
              Tracks attendance and punctuality efficiently.
            </Typography>

            <Box className="legend">
              <span>Less</span>
              <span className="dot level-1" />
              <span className="dot level-2" />
              <span className="dot level-3" />
              <span className="dot level-4" />
              <span>Full</span>
            </Box>
            </Box>
            <Box className="attendance-grid">
              <Box className="time-labels">
                {timeSlots.map((slot, idx) => (
                  <span key={idx}>{slot}</span>
                ))}
              </Box>

              <Box className="days-grid">
                {days.map((day, dayIdx) => (
                  <Box className="day-column" key={dayIdx}>
                  
                    {dataMatrix[dayIdx].map((level, i) => (
                      <Box key={i} className={`cell level-${level}`} />
                    
                    ))}
                    <strong>{day}</strong>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
          </Box>
          <Box className="today-task-container">
      <Typography variant="h6" className="today-task-title">Today task</Typography>

      <Box className="task-list">
        {tasks.map((task, index) => (
          <Paper key={index} elevation={0} className="task-card" sx={{
              borderRadius: 4,
              p: 3,
              width: '100%',
            }}>
            <Typography variant="subtitle1" className="task-time">{task.time}</Typography>
            <Typography variant="body1" className="task-title">{task.title}</Typography>
            <Typography variant="body2" className="task-desc">{task.description}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffProfile;
