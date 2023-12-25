// ./src/components/register-component/RegisterForm.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../../api/API';
import styles from './registerform.module.css';

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Reset previous error messages
    setError(null);
  
    // Create a payload with the entered credentials
    const registerPayload = {
      newUsername: username,
      newPassword: password,
    };
  
    try {
      // Make a request to the register API endpoint
      const response = await API.createUser(registerPayload);
  
      // Check the HTTP status code
      if (response.status === 200) {
        // Handle the successful registration response
        console.log(response.data);
        // You might want to handle the registration success in a way that suits your application
        // For example, you can redirect the user to the login page after successful registration
        router.push('/login');
      } 
      else if (response.status == 401){
        console.error('Unexpected status code:', response.status);
        setError('Username already exists. Please try again.');
      }
      else if (response.status == 404){
        console.error('Unexpected status code:', response.status);
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      // Log the entire error object to the console
      console.error('Registration failed:', error);
  
      // Check if error.response exists before accessing its properties
      if (error.response && error.response.data) {
        // Check the error response and display appropriate error message
        const errorMessage = error.response.data.message;
  
        if (errorMessage === 'empty') {
          setError('Username and password cannot be empty. Please try again.');
        } else if (errorMessage === 'exist') {
          setError('Username already exists. Please try again.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        // Handle cases where error.response is undefined or doesn't have the expected structure
        setError('Registration failed. Please try again.');
      }
    }
  };
  

  const handleLoginRedirect = () => {
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div className={styles.registerForm}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Please Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
        <p className={styles.registerText} onClick={handleLoginRedirect}>
          Already a user? Return to Login
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
