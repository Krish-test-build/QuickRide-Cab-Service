import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);

    const updateCaptain = (newCaptain) => {
        setCaptain(newCaptain);
    };

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, updateCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;