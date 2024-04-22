import '../App.css'
import * as React from 'react';
import { useState, useCallback, useRef } from 'react';

import TitleHeader from './titleBanner.component';
import EventCard from './eventCard.component';
import FAQ from './faq.componenet';
import EngagementShoot from './engagementShoot.component';
import Schedule from './schedule.component';
import Songs from './songs.component';
// import Registry from './registry.component';
import Attire from './attire.component';
import RSVPTag from './RSVPTag.compopnent';
import Navbar from './navbarScroll.component';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';



import Code from './code.componenet';


import Header from '../assets/Header/Header.png';
import WeddingEvents from '../assets/Header/WeddingEvents.png';
import event1 from '../assets/eventPhotos/event1.png';
import event2 from '../assets/eventPhotos/event2.jpg';
import event3 from '../assets/eventPhotos/event3.jpg';

function Home() {
  const scheduleRef = useRef();
  const faqRef = useRef();
  const engagementShootRef = useRef();
  const songRef = useRef();
  // const registryRef = useRef();
  const attireRef = useRef();
  const rsvpRef = useRef();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (elementRef) => {
    console.log(elementRef);
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
   });
   handleClose();
  };
  

  const [code, setCode] = useState({
    isValid: false
  });

  const validate = useCallback(() => {
    setCode(prev => {
      return {
        ...prev,
        isValid: true
      };
    });
    console.log(code.isValid);
  });

  return (
    <>
        <>
        
        {/* Navbar Component */}
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
                  <MenuItem onClick={() => scrollToSection(scheduleRef)}><div className='poiret'>Schedule</div></MenuItem>
                  <MenuItem onClick={() => scrollToSection(faqRef)}><div className='poiret'>FAQs</div></MenuItem>
                  <MenuItem onClick={() => scrollToSection(engagementShootRef)}><div className='poiret'>Engagement Shoot</div></MenuItem>
                  <MenuItem onClick={() => scrollToSection(songRef)}><div className='poiret'>Songs</div></MenuItem>
                  {/* <MenuItem onClick={() => scrollToSection(registryRef)}><div className='poiret'>Registry</div></MenuItem> */}
                  <MenuItem onClick={() => scrollToSection(attireRef)}><div className='poiret'>Attire</div></MenuItem>
                  <MenuItem onClick={() => scrollToSection(rsvpRef)}><div className='poiret'>RSVP</div></MenuItem>
              </Menu>
              </div>
              
              <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                <div className='poiret'>Justin & Tanya</div>
              </Typography>
              
            </Toolbar>
          </AppBar>
        </Box>

        {/* <Navbar ref={scheduleRef} /> */}
        <TitleHeader Title={'Justin & Tanya'}/> 

        <img src={Header} className="d-block" height="60%" alt="..."/>

        <div ref={scheduleRef}>
          <Schedule/>
        </div>
        
        <div className='test' ref={faqRef}>
          <FAQ />
        </div>

        <div ref={engagementShootRef}>
          <EngagementShoot/>
        </div>

        <div ref={songRef}>
          <Songs/>
        </div>

        {/* <div ref={registryRef}>
          <Registry/>
        </div> */}

        <div ref={attireRef}>
          <Attire/>
        </div>

        <div ref={rsvpRef}>
          <RSVPTag/>
        </div>

        </>
      
    </>
  )
}

export default Home;