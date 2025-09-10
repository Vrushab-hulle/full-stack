import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const InfinteScrollWithReactQuery = () => {
  const getCardData = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=10&_page=${pageParam}`
    );
    return await res.json();
  };

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getCardData,
    getNextPageParam: (lastPage, allPages) => {
      // If API returned a full page (10 items), assume there’s more
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handelInfiniteScroll = async () => {
    try {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      if (bottom && hasNextPage) {
        fetchNextPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [hasNextPage]);

  return (
    <div>
      <h1>Infinite Scroll using React Query !!!</h1>
      {data?.pages?.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page.map((user) => (
            <li
              style={{
                height: "100px",
                border: "2px solid black",
                margin: "5px",
              }}
              key={user.id}
            >
              {user.id} - {user.name}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default InfinteScrollWithReactQuery;
