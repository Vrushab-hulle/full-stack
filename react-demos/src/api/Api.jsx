import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPost = (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=5`);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "i have been updated" });
};

export const addUser = async (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...newUser, id: Date.now() });
    }, 200);
  });
};
