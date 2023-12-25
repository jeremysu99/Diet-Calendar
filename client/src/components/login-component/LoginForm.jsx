// ./src/components/login-component/LoginForm.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../../api/API';
import styles from './loginform.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setError(null);

    // Create a payload with the entered credentials
    const loginPayload = {
      username,
      password,
    };

    try {
      // Make a request to the login API endpoint
      const response = await API.loginUser(loginPayload);

      // Handle the successful login response
      console.log(response.data);
      // Assuming the API response contains a token or some indicator of a successful login
      // You might want to store tokens or user information in state or local storage

      // Redirect to the Dashboard page upon successful login
      router.push('/dashboard');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response.data.error);
      setError('Incorrect username or password. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    // Redirect to the registration page
    router.push('/register'); // Adjust the route according to your registration page route
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Please Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        <p className={styles.registerText} onClick={handleRegisterClick}>
          New User? Register Here
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
