import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { avatarRoute } from '../utils/ApiRoutes';

export default function Avatar() {
  const api =
    'https://api.multiavatar.com/username.svg?size=128&background=none&color=fff&length=1&bold=true&rounded=true&fon';
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();

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
