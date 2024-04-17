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

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Navbar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const [guestData, setGuestData] = useState([]);

  useEffect(() => {
      const loggedInUser = document.cookie.split('=')[1];
      console.log(loggedInUser);
      if (loggedInUser) {
          //verify JWT signature
          const verified = verifyJWT(loggedInUser);
          console.log("menu bar: ", verified);
          //change menu bar to logged in mode if valid
          if (verified) {
            setAuth(true);
          } else {
            setAuth(false);
            //Cookies.remove('user-authentication');
          }
          //delete token if invalid
      } else {
          //menu bar is not logged in version
      }
      console.log(loggedInUser);
  }, [auth]);

  const verifyJWT = async (token) => {
    console.log("token: ", token)
    const tokenData = await fetch('http://localhost:5000/verifyJWT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        Token: token
    })
    })
    .then(res => res.json());

    console.log("token data contains: ", tokenData);

    decodeJWT(token);
  }


  const decodeJWT = async (token) => {
    console.log("token: ", token)
    const guestData = await fetch('http://localhost:5000/decodeJWT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Token: token
        })
    })
    .then(res => res.json());

    console.log("does this run? ", guestData);
    setGuestData(guestData);
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorE2(null);
  };

  const logOutUser = () => {
    console.log("Attempting to delete JWT");
    document.cookie = "userAuthentication=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setAnchorE2(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(196, 196, 179, 0.9)' }}>
        <Toolbar>
        {!auth && (
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
              <MenuItem href="RSVP" component="a" onClick={handleClose}>RSVP</MenuItem>
          </Menu>
          </div>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Justin & Tanya
          </Typography>
          {auth && (
            <div>
              {guestData.Display}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              
            
              <Menu
                id="menu-appbar"
                anchorEl={anchorE2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorE2)}
                onClose={handleUserClose}
              >
                <MenuItem href="../" component="a" onClick={handleUserClose}>Home</MenuItem>
                <MenuItem href="../Guests" component="a" onClick={handleUserClose}>Guest List</MenuItem>
                <MenuItem href="../Events" component="a" onClick={handleUserClose}>Events</MenuItem>
                <MenuItem href="../Invite" component="a" onClick={handleUserClose}>Invite</MenuItem>
                <MenuItem href="../Guest" component="a" onClick={handleUserClose}>Profile</MenuItem>
                <MenuItem href="../Photos" component="a" onClick={handleUserClose}>Photos</MenuItem>
                {/* Will delete the JWT token */}
                <MenuItem href="../" component="a" onClick={logOutUser}>Log Out</MenuItem> 
              </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}