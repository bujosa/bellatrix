import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormContainer } from '../styles/FormStyles';
import { loginRoute } from '../utils/ApiRoutes';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('bellatrix-user')) {
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
    const { password, email } = values;
    if (password.length < 8) {
      toast.error(
        'Password should be greater than 8 characters.',
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
      const { email, password } = values;
      await axios
        .post(loginRoute, {
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
            toast.success('Login Successful', toastOptions);
            localStorage.setItem('bellatrix-user', JSON.stringify(res.data));
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
          <button type="submit">Login</button>
          <span>
            Don't have account? <Link to="/register">Signup</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Login;
