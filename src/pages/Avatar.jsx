import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { avatarRoute } from '../utils/ApiRoutes';

export default function Avatar() {
  const api = 'https://api.multiavatar.com/456785';
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleAvatar = async () => {};

  useEffect(async () => {
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 100)}}`
      );
      const buffer = new Buffer.from(image.data, 'base64');
      const base64Image = buffer.toString('base64');
    }
    setAvatar(base64Image);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Avatar Profile Picture</h1>
        </div>
        <div className="avatars">
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <img src={api} alt="avatar" />
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div``;
