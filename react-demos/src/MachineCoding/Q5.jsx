//Q5. Write a simple component that fetches data from an API and displays it.

import { useEffect, useState } from "react";

function Q5() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
    //Q8. How can you use the useEffect hook to mimic componentDidUnMount?
    return () => {
      console.log("component unmounted");
    };
  }, []);
  return (
    <div>
      {data.map((user) => {
        return <li key={user.id}>{user.title}</li>;
      })}
    </div>
  );
}

export default Q5;
