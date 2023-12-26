// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { Button, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const AuthForm = () => {
  const [view, setView] = React.useState(0);
  const navigate = useNavigate();
  
  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  useEffect(() => {
    getToken();
  }, []); // Run once when the component mounts

  function getToken() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setView(2);
    }
  }

  const handleLogin = () => {
    // after successful login, change view to play
    getToken(); // Check for token after login
    setView(2);
  };

  const handleRegister = () => {
    // after successful register, change view to login
    setView(0);
  };

  return (
    <Container>
      <Box>
        <Box>
          <Tabs value={view} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
            <Tab label="Play" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={view} index={0}>
          <LoginForm onLogin={handleLogin} />
        </CustomTabPanel>
        <CustomTabPanel value={view} index={1}>
          <RegisterForm onRegister={handleRegister} />
        </CustomTabPanel>
        <CustomTabPanel value={view} index={2}>
          <Button variant="contained" onClick={() => navigate('/game')}>Play</Button>
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default AuthForm;
