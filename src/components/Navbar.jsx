// Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Badge,
  Drawer,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import FlagIcon from "@mui/icons-material/Flag";

import Sidebar from "../components/SideBar"

const SearchWrapper = styled(Paper)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "6px 16px",
  borderRadius: 24,
  minWidth: 260,
  border: "1px solid #e0e0e0",
}));

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT SIDE */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={onMenuClick} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>

          <SearchWrapper>
            <InputBase placeholder="Search Keywords..." sx={{ flex: 1 }} />
            <SearchIcon color="action" />
          </SearchWrapper>
        </Box>

        {/* RIGHT SIDE */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton><FlagIcon /></IconButton>
          <IconButton><SettingsIcon /></IconButton>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <Avatar src="https://i.pravatar.cc/300" />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
