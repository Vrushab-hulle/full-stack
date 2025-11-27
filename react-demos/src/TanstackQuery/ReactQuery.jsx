import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { deletePost, fetchPost, updatePost } from "../api/Api";
import { useNavigate } from "react-router-dom";

const ReactQuery = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const getPostDetails = async () => {
    try {
      const response = await fetchPost(pageNumber);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  //placeholderData: keepPreviousData-->what it does it do not show loading while using pagination it just show same page until next page fetch call is done
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: getPostDetails,
    placeholderData: keepPreviousData, // gcTime: 5 * 60 * 1000,
    // staleTime: 20 * 1000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  const queryClient = useQueryClient();

  //! delete mutation query
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (post) => {
        return post?.filter((curr) => curr.id !== id);
      });
    },
  });

  // update mutation query

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      queryClient.setQueryData(["posts", pageNumber], (postData) => {
        return postData?.map((curr) =>
          curr.id === postId ? { ...curr, title: apiData.data.title } : curr
        );
      });
    },
  });

  const handleNavigate = (id) => {
    navigate(`/rtq/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="p-6 grid gap-4">
      {post?.map((curr) => {
        const { id, title } = curr;
        return (
          <div
            key={id}
            className=" p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div onClick={() => handleNavigate(id)}>
              <h2 className="font-semibold text-lg mb-2">Post #{id}</h2>
              <p className="text-gray-700">{title}</p>
            </div>
            <div>
              <button
                className="cursor-pointer"
                onClick={() => deleteMutation.mutate(id)}
              >
                Delete
              </button>
              <button
                className="cursor-pointer"
                onClick={() => updateMutation.mutate(id)}
              >
                Update
              </button>
            </div>
          </div>
        );
      })}
      <div className="flex gap-5 bg-amber-200 justify-center">
        <button onClick={() => setPageNumber((prev) => prev - 5)}>Prev</button>
        <p>{pageNumber / 5 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 5)}>Next</button>
      </div>
    </div>
  );
};

export default ReactQuery;
