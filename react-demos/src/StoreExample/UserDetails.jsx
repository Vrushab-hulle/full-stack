import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearAllusers, deleteUser } from "../features/userSlice";
import { store } from "../redux/store";

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users);
  const [trackIndex, setTrackIndex] = useState(0);
  const addNewUser = async () => {
    const userData = await fetch("https://jsonplaceholder.typicode.com/users");
    const userResponse = await userData.json();
    dispatch(addUser(userResponse[trackIndex]));
    setTrackIndex((prev) => prev + 1);
  };
  const deleteUserById = async (id) => {
    dispatch(deleteUser(id));
  };
  const deleteAllUser = () => {
    dispatch(clearAllusers());
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="">
      <h1>List of user Details</h1>
      <button onClick={() => addNewUser(user?.length)}>Add User</button>
      <button onClick={() => deleteAllUser()}>Delete All User</button>
      {user && (
        <div>
          {user.map((data, index) => (
            <ul key={data?.id}>
              <li>
                {data?.id}-{data?.name}
              </li>
              <button onClick={() => deleteUserById(data?.id)}>
                Delete User
              </button>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
