import React from 'react';
import { createContext, useState, useEffect } from 'react';


export const TokenContext = createContext();

export const TokenProvider = (props) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
      window.sessionStorage.setItem('Token', token)
    }, [token]);

    return (
        <TokenContext.Provider
        value={[token, setToken]}>
     
        {props.children}
      </TokenContext.Provider>
    );
};

export default TokenContext;