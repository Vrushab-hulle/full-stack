import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ReactQueryIndv = () => {
 const { id } = useParams();

  const getSinglePost = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.json();
  };

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-2">{post.body}</p>
      <p className="text-sm text-gray-500">Post ID: {post.id}</p>
      <p className="text-sm text-gray-500">User ID: {post.userId}</p>

    </div>
  );
}

export default ReactQueryIndv