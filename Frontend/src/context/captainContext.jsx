import { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    
  }, [captain]);

  useEffect(() => {
    const storedCaptain = localStorage.getItem('captain');
    if (storedCaptain) {
      try {
        const parsedCaptain = JSON.parse(storedCaptain);
        if (parsedCaptain && parsedCaptain._id) {
          
        } else {
          console.warn('⚠️ Invalid captain data in localStorage:', parsedCaptain);
        }
      } catch (error) {
        console.error('❌ Failed to parse captain from localStorage:', error);
      }
    } else {
      console.log('ℹ️ No captain found in localStorage');
    }
  }, []);

  const updateCaptain = (captainData) => {
    if (!captainData || !captainData._id) {
      console.warn('⚠️ Ignoring invalid updateCaptain() call:', captainData);
      return;
    }
    
    setCaptain(captainData);
    localStorage.setItem('captain', JSON.stringify(captainData));
  };

  const value = {
    captain,
    setCaptain,
    updateCaptain
  };

  

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
