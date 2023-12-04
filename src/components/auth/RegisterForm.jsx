// RegisterForm.jsx
import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import AuthService from './AuthService';

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
      <InputField
        label="Character"
        type="text"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
      />
      <InputField
        label="User"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </form>
  );
}
