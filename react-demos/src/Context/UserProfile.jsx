import { useContext } from "react";
import { context } from "./UserContext";

export const UserProfile = () => {
  const user  = useContext(context);
  console.log(user);
  

  return (
    <div>
      <h1>User Profile</h1>
      <p>User:{user.userName}</p>
      <p>Age:{user.age}</p>
    </div>
  );
};



