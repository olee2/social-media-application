import { apiCall } from "./api.mjs";
import { loggedIn } from "./logged-in.mjs";

const token = loggedIn();

const options = (method, body) => {
  if (body) {
    return {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPosts = async (order, imageFilter) => {
  order === "" ? (order = "desc") : null;

  const url = `https://nf-api.onrender.com/api/v1/social/posts?_author=true&comments=true&sortOrder=${order}`;

  const data = await apiCall(url, options("get"));

  return data;
};

export const createPost = async (body) => {
  const url = `https://nf-api.onrender.com/api/v1/social/posts`;

  return await apiCall(url, options("post", body));
};

export const editPost = async (body, id) => {
  const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;

  return await apiCall(url, options("put", body));
};
