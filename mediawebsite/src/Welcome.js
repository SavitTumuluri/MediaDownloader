import React from 'react';
import './App.css';
import Home from './home';
import { Route, Routes, useNavigate, Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

function Welcome() {
  
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/home');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-popup">
          <h1>Welcome to MediaConverter</h1>
          <Box textAlign='center'><Button className='button_ui' onClick={handleEnterClick}>
            Enter
          </Button></Box>
        </div>
      </header>
    </div>
    

    
  )
}

export default Welcome;
