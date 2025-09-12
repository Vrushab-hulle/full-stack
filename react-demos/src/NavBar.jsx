// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/userDetails">User Details</Link>
        </li>
        <li>
          <Link to="/todos">Your To-Do's</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
