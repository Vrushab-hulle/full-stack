import React, { useCallback, useEffect, useMemo, useState } from "react";

const USERS_PER_PAGE = 5;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(USERS_PER_PAGE);
  const [search, setSearch] = useState("");

  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(search), 800);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setVisibleCount(USERS_PER_PAGE); // reset pagination on search
  }, []);

  const filteredUser = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [debounced, users]);

  const visibleUsers = useMemo(() => {
    return filteredUser.slice(0, visibleCount);
  }, [filteredUser, visibleCount]);

  return (
    <div>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
      />
      <br />
      {visibleUsers.map((user, index) => (
        <ol className="flex justify-between" key={index}>
          <p>{user.name}</p>
        </ol>
      ))}

      {visibleCount < filteredUser.length && (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setVisibleCount((prev) => prev + USERS_PER_PAGE)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default UserList;
