import React, { createContext, useState, useEffect } from 'react';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState('');

useEffect(() => {

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
     
      if (parsedUser && parsedUser._id) {
        setUser(parsedUser);
 
      }   
    } catch (err) {
      console.error("❌ Error parsing user from localStorage", err);
    }
  }
}, []);





  const updateUser = (userData) => { 
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
};


  return (
    <userDataContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
