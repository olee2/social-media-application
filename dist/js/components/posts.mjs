import { apiCall } from "./api.mjs";
import { loggedIn } from "./loggedIn.mjs";

const token = loggedIn();

/**
 * A function for generating options for http requests.
 * @param {string} method The http request method for the api call.
 * @param {object} body An object with the body of the api call.
 * @returns an object with request options.
 */

const options = (method, body) => {
  const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (body) {
    return {
      method,
      body: JSON.stringify(body),
      headers,
    };
  }
  return {
    method,
    headers,
  };
};

/**
 * A function for fetching posts.
 * @param {string} order A string indicating the sorting order
 * @returns The data received from the api.
 */

export const getPosts = async (order) => {
  order === "" ? (order = "desc") : null;

  const url = `https://nf-api.onrender.com/api/v1/social/posts?_author=true&comments=true&sortOrder=${order}`;

  const data = await apiCall(url, options("get"));

  return data;
};

/**
 * A function for creating a post.
 * @param {object} body The body for the api call.
 * @returns An api call.
 */

export const createPost = async (body) => {
  const url = `https://nf-api.onrender.com/api/v1/social/posts`;

  return await apiCall(url, options("post", body));
};

/**
 * A function for editing a post.
 * @param {object} body The body for the api call.
 * @param {number} id The id of the post.
 * @returns An api call.
 */

export const editPost = async (body, id) => {
  const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;

  return await apiCall(url, options("put", body));
};

/**
 * A function for deleting a specific post on the server.
 * @param {number} id The id of the post
 * @returns An api call.
 */

export const deletePost = async (id) => {
  return await apiCall(
    `https://nf-api.onrender.com/api/v1/social/posts/${id}`,
    options("delete")
  );
};
