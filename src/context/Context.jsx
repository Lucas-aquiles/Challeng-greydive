import { useState, createContext, useEffect } from "react";

export const contextApp = createContext();

// para pasarle  a loc componentes como Provider
export const ContextApp = ({ children }) => {
  const [users, setUsers] = useState({});
    console.log(users)
  return (
    <contextApp.Provider
      value={{
        value: [users, setUsers],
      }}
    >
      {children}
    </contextApp.Provider>
  );
};
