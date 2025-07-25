import React, { createContext, useState } from "react";

export const context = createContext();


const UserContext = ({ children }) => {
  const [userName, setUsername] = useState("vrushbah");

  return <context.Provider value={{userName}}>{children}</context.Provider>;
};

export default UserContext;
