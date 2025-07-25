import React, { useState } from "react";

const WelcomeMessage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
    category: "",
    gender: "",
  });
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!data.username) newError.username = "Username required";
    if (!data.email) newError.email = "Email required";
    if (!data.password) newError.password = "Password required";
    if (!data.terms) newError.terms = "You must accept terms";
    if (!data.category) newError.category = "Select a category";
    if (!data.gender) newError.gender = "Select gender";
    return newError;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isFormValid = Object.keys(validate()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      console.log("Submitted data:", data);
    }
  };

  const categories = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={data.username}
        onChange={handleChange}
      />
      {error.username && <p style={{ color: "red" }}>{error.username}</p>}

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={data.email}
        onChange={handleChange}
      />
      {error.email && <p style={{ color: "red" }}>{error.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={data.password}
        onChange={handleChange}
      />
      {error.password && <p style={{ color: "red" }}>{error.password}</p>}

      <label>
        <input
          type="checkbox"
          name="terms"
          checked={data.terms}
          onChange={handleChange}
        />
        I agree to the terms
      </label>
      {error.terms && <p style={{ color: "red" }}>{error.terms}</p>}

      <select name="category" value={data.category} onChange={handleChange}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      {error.category && <p style={{ color: "red" }}>{error.category}</p>}

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit form
      </button>
    </form>
  );
};

export default WelcomeMessage;
