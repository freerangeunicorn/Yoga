import React, { createContext, useState } from "react";


export const AppContext = createContext();


 function Context({children}) {
    const [token, setToken] = useState(null);
    return (
        <AppContext.Provider
        value={{
         token
        }}
      >
        {children}
      </AppContext.Provider>
    )
}

export default Context;