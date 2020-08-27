import React from 'react';
import { createContext, useState } from 'react';


export const TokenContext = createContext();

export const TokenProvider = (props) => {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider
        value={[token, setToken]}>
     
        {props.children}
      </TokenContext.Provider>
    );
};

export default TokenContext;