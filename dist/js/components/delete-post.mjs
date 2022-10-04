import { apiCall } from "./api.mjs";

/**
 * A function for deleting a specific post on the server.
 * After the api call is made an alert signals the user that it was successfull.
 * The user is then redirected to the profile page.
 * @param {number} id The id of the post
 * @param {string} token The JSON Web Token received from the server when the user logged in
 */

export const deletePost = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiCall(
    `https://nf-api.onrender.com/api/v1/social/posts/${id}`,
    options
  );

  alert("Post deleted");
  location.assign("../profile.html");
};

/**
 * A function for rendering HTML for the delete button if the logged in user is the author.
 * @param {string} user The name of the logged in user
 * @param {string} author The name of the author of the post
 * @returns Html for the delete button if the user is the author of the post, else an empty string
 */

export const deleteHTML = (user, author) => {
  const html = `    
    <div class="align-items-center delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    </div>`;

  if (user === author) {
    return html;
  } else {
    return ``;
  }
};
