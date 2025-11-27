import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addUser } from "../api/Api";


const AddNewUserData = () => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => Promise.resolve([{ id: 1, name: "John" }]),
  });

  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldUser) => [...oldUser, newUser]);
    },
  });

  const handleAddUser = () => {
    addMutation.mutate({ name });
    setName("");
  };

  return (
    <div>
      <ul>
        {users?.map(({ id, name }) => (
          <li>
            {id}-{name}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddNewUserData;
