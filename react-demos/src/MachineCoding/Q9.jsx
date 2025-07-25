// Write a component that fetches data using async/await.

import { useEffect } from "react";

const Q9 = () => {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
    }

    fetchData();
  }, []);
  return <div></div>;
};

export default Q9;
