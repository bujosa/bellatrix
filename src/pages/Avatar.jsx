import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { avatarRoute } from '../utils/ApiRoutes';
import { Buffer } from 'buffer';

export default function Avatar() {
  const api = 'https://api.multiavatar.com/7656';
  const [avatars, setAvatar] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];

      for (let i = 0; i < 4; i++) {
        promises.push(
          axios
            .get(`${api}/${Math.round(Math.random() * 1000)}`)
            .then((response) => response.data)
        );
      }
      try {
        const responses = await Promise.all(promises);
        const avatarData = responses.map((imageData) => {
          return Buffer.from(imageData, 'base64').toString('base64');
        });

        setAvatar(avatarData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Select your avatar picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? 'selected' : ''
                }`}
                key={index}
                onClick={() => setSelectedAvatar(index)}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            );
          })}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar  {
      border: 0.2rem solid transparent;
      img {
        height: 6rem;
      }
    }
`;
