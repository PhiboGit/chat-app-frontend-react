// AuthService.js
const AuthService = {
  // In a real-world scenario, you'd implement methods for interacting with the backend for authentication
  // For simplicity, we'll just set a token in local storage
  login: async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        // Handle login error
        const errorText = await response.text();
        console.error('Login failed:', response.status, errorText);
        throw new Error(errorText || 'Login failed');
      }

      // Extract the token from the JSON response
      const responseData = await response.json();
      console.log('Login successful:', responseData);
      const token = responseData.token;

      // Set the token in localStorage
      if (token){
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  register: async (character, username, password) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character,
          username,
          password,
        }),
      });

      if (!response.ok) {
        // Handle registration error
        const errorText = await response.text();
        console.error('Registration failed:', response.status, errorText);
        throw new Error(errorText || 'Registration failed');
      }

      // Registration successful
      const text = await response.text()
      console.log('Registration successful:', text);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },
};

export default AuthService;
