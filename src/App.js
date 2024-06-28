import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BreweryDetails from './components/BreweryDetails';
import { useCookies } from 'react-cookie';

import './App.css';

const App = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.accessToken) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [cookies.accessToken]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/breweries/:id"  element={<BreweryDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
