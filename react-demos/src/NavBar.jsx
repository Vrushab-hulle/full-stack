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
        <li>
          <Link to="/fetchOld">Older Way fetch</Link>
        </li>
        <li>
          <Link to="/rtq">New Way fetch(RTQ)</Link>
        </li>
        <li>
          <Link to="/user">Add new User(RTQ)</Link>
        </li>
        <li>
          <Link to="/debounce">Debounce Effect</Link>
        </li>
        <li>
          <Link to="/hoc">HOC</Link>
        </li>
        <li>
          <Link to="/vl">Virtulaized List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
