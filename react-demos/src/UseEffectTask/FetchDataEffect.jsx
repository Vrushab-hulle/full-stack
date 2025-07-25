import React, { useEffect, useState } from "react";

const FetchDataEffect = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchPostData();
  }, []);

  async function fetchPostData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
    setData(data);
  }
  return (
    <div>
      {data?.map((post) => (
        <section key={post.id}>
          <li>{post.title}</li>
        </section>
      ))}
    </div>
  );
};

export default FetchDataEffect;
