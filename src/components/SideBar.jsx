import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

const SidebarContainer = styled(Paper)(({ theme }) => ({
  width: 260,
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.02)',
  },
  transition: 'all 0.3s ease',
  borderLeft: '4px solid transparent',
}));

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
    { text: 'Bookings', icon: <BookOnlineIcon />, path: 'bookings' },
    { text: 'Services', icon: <MiscellaneousServicesIcon />, path: 'services' },
    { text: 'Create Staff', icon: <PeopleAltIcon />, path: 'create-staff' },
    { text: 'Assign Task', icon: <AssignmentIcon />, path: 'assign-task' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  return (
    <SidebarContainer elevation={5}>
      <ProfileBox>
        <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Admin User</Typography>
          <Typography variant="body2" color="text.secondary">Administrator</Typography>
        </Box>
      </ProfileBox>

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <StyledListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname.includes(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
