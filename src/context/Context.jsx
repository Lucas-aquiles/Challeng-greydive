import { useState, createContext } from "react";

export const contextApp = createContext();

// para pasarle  a loc componentes como Provider
export const ContextApp = ({ children }) => {
  const [users, setUsers] = useState({});
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
