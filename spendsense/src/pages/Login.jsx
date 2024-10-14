import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Ensure useNavigate is being used instead of useHistory

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/login', { email, password });
//       if (response.data.success) {
//         navigate('/dashboard'); // Navigate after successful login
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

const handleLogin = async (e) => {
    e.preventDefault();
    
    // Hardcoded credentials
    const hardcodedEmail = "admin@spendsense.co.uk";
    const hardcodedPassword = "password";
  
    // Check if the entered credentials match the hardcoded ones
    if (email === hardcodedEmail && password === hardcodedPassword) {
      // On successful login, redirect to dashboard
      navigate('/dashboard');
    } else {
      alert("Invalid login credentials.");
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login to SpendSense</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
