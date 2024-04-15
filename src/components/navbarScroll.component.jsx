import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Navbar({scheduleRef}) {
  const schedule = useRef(scheduleRef);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollSchedule = (elementRef) => {
    console.log(schedule);
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
   });
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(196, 196, 179, 0.9)' }}>
        <Toolbar>
          <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => scrollSchedule(scheduleRef)}>Schedule</MenuItem>
          </Menu>
          </div>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Justin & Tanya
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}