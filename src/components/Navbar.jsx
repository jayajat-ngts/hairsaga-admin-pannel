import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Badge, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import FlagIcon from '@mui/icons-material/Flag';

const SearchWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  boxShadow: 'none',
  borderRadius: 24,
  minWidth: 300,
  border: '1px solid #f0f0f0',
}));

const CircleButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#f5f9ff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: '50%',
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor: '#e8f0fe',
  },
}));

const Navbar = () => {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ p: 1, backgroundColor: '#fff', boxShadow:"lg"}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <CircleButton>
            <MenuIcon />
          </CircleButton>
          <SearchWrapper>
            <InputBase placeholder="Search Keywords..." sx={{ flex: 1 }} />
            <SearchIcon color="action" />
          </SearchWrapper>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <CircleButton>
            <FlagIcon />
          </CircleButton>
          <CircleButton>
            <SettingsIcon />
          </CircleButton>
          <CircleButton>
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </CircleButton>
          <CircleButton>
            <Avatar src="https://i.pravatar.cc/300" />
          </CircleButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;