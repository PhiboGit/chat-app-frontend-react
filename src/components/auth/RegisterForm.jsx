// RegisterForm.jsx
import React, { useState } from 'react';
import AuthService from './AuthService';
import { Button, Grid, TextField } from '@mui/material';

export default function RegisterForm({ onRegister }) {
  // State for form fields
  const [character, setCharacter] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthService.register(character, user, password);
      // If registration is successful, switch back to login view
      onRegister();
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <TextField
            label="Character"
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="User"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
          <Button variant="contained" type="submit">Register</Button>
        </Grid>
      </Grid>
    </form>
  );
}
