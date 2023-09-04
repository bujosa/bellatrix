import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function Avatar() {
  const api =
    'https://api.multiavatar.com/username.svg?size=128&background=none&color=fff&length=1&bold=true&rounded=true&fon';
  const [avatar, setAvatar] = React.useState('');
  const navigate = useNavigate();

  return <div>Avatar</div>;
}

const Container = styled.div``;
