import React, { useState } from "react";

const articles = [
  {
    title: "Introduction to JavaScript",
    content:
      "JavaScript is a programming language commonly used in web development...",
  },
  {
    title: "CSS Styling Tips",
    content: "Here are some useful CSS tricks to improve your designs...",
  },
  {
    title: "React Basics",
    content:
      "React is a popular JavaScript library for building user interfaces...",
  },
  {
    title: "Node.js Fundamentals",
    content: "Node.js allows you to run JavaScript on the server side...",
  },
  {
    title: "Database Design Principles",
    content: "Learn the core concepts of efficient database design...",
  },
];

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return !articles || articles.length === 0 ? (
    <h1>No articles found</h1>
  ) : (
    <div>
      {articles.map((a, index) => (
        <div key={index}>
          <button onClick={() => handleToggle(index)}>{a.title}</button>
          {openIndex === index && <p>{a.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default Accordian;
