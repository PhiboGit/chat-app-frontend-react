// LoginForm.jsx
import React, { useState } from 'react';
import AuthService from './AuthService';
import { Button, TextField, Grid } from '@mui/material';

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
      <Grid container spacing={1} direction="column">
        <Grid item>
          <TextField
            label="User"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
