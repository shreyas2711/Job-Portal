import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Login = ( {setIsAuth} ) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setErrors({
        email: formData.email ? '' : 'Email is required',
        password: formData.password ? '' : 'Password is required',
      });
      return;
    }
  
    try {
      const response = await axios.post('/api/signin', formData);
      const { token } = response.data;
  
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuth', true);
      setIsAuth=true; // Update isAuth state
  
     navigate("/createpost");

    } catch (error) {
      console.error('Login failed:', error);
  
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({ email: error.response.data.error, password: '' });
      } else {
        setErrors({ email: 'Authentication failed. Please check your credentials.', password: '' });
      }
    }
  };
  

  return (
    <>
    <Navbar/>
      <form onSubmit={handleFormSubmit} style={{marginTop:'5rem'}}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <div style={{ color: 'red' }}>{errors.email}</div>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <div style={{ color: 'red' }}>{errors.password}</div>
          <button type="submit">Log In</button>
  
      </form>
    </>
  );
};

export default Login;
