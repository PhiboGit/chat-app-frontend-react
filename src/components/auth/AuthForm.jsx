// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Button from '../common/Button';

import './Auth.css'; // Import the CSS file for styling

const AuthForm = () => {
  const [view, setView] = useState('login'); // 'login', 'register', 'play'
  const navigate = useNavigate();
  
  useEffect(() => {
    getToken();
  }, []); // Run once when the component mounts

  function getToken() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setView('play');
    }
  }

  const handleLogin = () => {
    // after successful login, change view to play
    getToken(); // Check for token after login
    setView('play');
  };

  const handleRegister = () => {
    // after successful register, change view to login
    setView('login');
  };

  const renderView = () => {
    switch (view) {
      case 'register':
        return <RegisterForm onRegister={handleRegister} />;
      case 'play':
        return <Button onClick={() => navigate('/game')}>Play</Button>;
      default:
        return <LoginForm onLogin={handleLogin} />
    
    }
  };

  return (
    <div>
      <nav className="horizontal-navbar">
        <ul>
          <li className={view === 'login' ? 'active' : ''} onClick={() => setView('login')}>
            Login
          </li>
          <li className={view === 'register' ? 'active' : ''} onClick={() => setView('register')}>
            Register
          </li>
        </ul>
      </nav>
      {renderView()}
    </div>
  );
};

export default AuthForm;
