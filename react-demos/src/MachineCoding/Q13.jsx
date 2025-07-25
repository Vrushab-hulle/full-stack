//Create a component that uses the useContext hook.

import { createContext, useContext } from "react";

export const Context = createContext();
function ContextData() {
  const name = "vrushabh";
  const age = 27;

  return (
    <>
      <Context.Provider value={{ name, age }}>
        <Q13 />
      </Context.Provider>
    </>
  );
}

function Q13() {
  const data = useContext(Context);
  console.log(data);
  
  return (
    <>
      <li>{data.name}</li>
      <li>{data.age}</li>
    </>
  );
}

export default ContextData;
