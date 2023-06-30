import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormContainer } from '../styles/FormStyles';
import { registerRoute } from '../utils/ApiRoutes';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('bellatrix-user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        'Password does not match with confirm password.',
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        'Username should be greater than 3 characters.',
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions
      );
      return false;
    } else if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password } = values;
      await axios
        .post(registerRoute, {
          username,
          email,
          password,
        })
        .catch((err) => {
          const { response } = err;
          if (response && response.data) {
            toast.error(response.data.message, toastOptions);
          }
        })
        .then((res) => {
          if (res && res.data) {
            toast.success('Registration Successful', toastOptions);
            navigate('/login');
          }
        });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-group">
            <img src={Logo} alt="logo" />
            <h1> Bellatrix </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;
