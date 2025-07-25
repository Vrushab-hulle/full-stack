import React, { useEffect, useState } from "react";

function useApi(url) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setLoading(false);
      });
  }, [url]);
  return { data, err, loading };
}

const Q25 = () => {
  const { data, err, loading } = useApi(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error:{err.message}</p>;
  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Q25;
