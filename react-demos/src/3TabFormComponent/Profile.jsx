import React from "react";

const Profile = ({ data, setData, error }) => {
  console.log(error);

  const { name, age } = data;

  const handleChange = (e, name) => {
    setData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          className="border"
          type="text"
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />
        {error.name && <p>{error.name}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          className="border"
          type="number"
          value={age}
          onChange={(e) => handleChange(e, "name")}
        />
      </div>
    </div>
  );
};

export default Profile;
