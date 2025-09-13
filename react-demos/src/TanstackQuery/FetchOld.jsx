import React, { useEffect, useState } from "react";
import { fetchPost } from "../api/Api";

const FetchOld = () => {
  const [post, setPost] = useState([]);

  const getPostDetails = async () => {
    try {
      const response = await fetchPost();
      console.log(response);
      setPost(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <div>
      {post?.map((curr) => {
        const { id, body } = curr;
        return (
          <ul key={id}>
            <li>
              {id}-{body}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default FetchOld;
