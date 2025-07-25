import React from "react";
import { Data, Data1 } from "../App";

import { useContext } from "react";

const ComponentC = () => {
  const userName = useContext(Data);
  const age = useContext(Data1);

  return (
    <h1>
      My Name is {userName} and i am {age} years old
    </h1>
  );
};

export default ComponentC;

// return (
//     <Data.Consumer>
//       {(name) => {
//         return (
//           <Data1.Consumer>
//             {(age) => {
//               return (
//                 <h1>
//                   My name is {name} and i am {age} years old
//                 </h1>
//               );
//             }}
//           </Data1.Consumer>
//         );
//       }}
//     </Data.Consumer>
//   );
