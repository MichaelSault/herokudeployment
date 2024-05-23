import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap';
import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './components/home.component.jsx';
import AddGuest from './components/addGuest.component.jsx';
import GuestList from './components/guestList.component.jsx';
import Spotify from './components/spotify.component.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/UnlistedPage/Invite' element={<AddGuest/>}/>
        <Route path='/UnlistedPage/GuestList' element={<GuestList/>}/>
        <Route path='/UnlistedPage/Spotify' element={<Spotify/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
