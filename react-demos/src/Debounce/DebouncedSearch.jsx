import React, { useEffect, useState } from "react";

const DebouncedSearch = () => {
  const [query, setQuery] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        setDebounceSearch(query);
        fetchData(query);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debounceSearch) {
      console.log(query);
    }
  }, [debounceSearch]);

  const fetchData = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Debounced Search</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
