import React, { useContext, useEffect, useState } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser } = useContext(userDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data); 
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('❌ Failed to fetch user profile:', err);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
