import React, { createContext, useState } from "react";

export const context = createContext();


const UserContext = ({ children }) => {
  const [userName, setUsername] = useState("vrushbah");
  const [age, setAge] = useState(27);

  return <context.Provider value={{userName,age}}>{children}</context.Provider>;
};

export default UserContext;
