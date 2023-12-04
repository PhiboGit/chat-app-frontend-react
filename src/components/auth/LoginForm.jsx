// LoginForm.jsx
import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import AuthService from './AuthService';

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
      <InputField
        label="User"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
