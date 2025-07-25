import React, { useState } from "react";

const Profile = () => {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  return (
    <div>
      Name:
      <input
        type="text"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <br />
      Age:
      <input
        type="text"
        name="age"
        value={person.age}
        onChange={handleChange}
      />
      <br />
      <h1>Profile Info</h1>
      <p>{person.name}</p>
      <p>{person.age}</p>
    </div>
  );
};

export default Profile;
