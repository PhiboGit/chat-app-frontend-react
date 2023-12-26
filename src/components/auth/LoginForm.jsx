// LoginForm.jsx
import React, { useState } from 'react';
import AuthService from './AuthService';
import { Button, TextField } from '@mui/material';

export default function LoginForm({ onLogin }) {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthService.login(username, password);
      // If login is successful, update the view
      onLogin();
    } catch (error) {
      // Handle login error (you can display an error message to the user)
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="User"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
