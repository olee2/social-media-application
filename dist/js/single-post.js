import { loggedIn } from "./components/logged-in.mjs";
import { apiCall } from "./components/api.mjs";
import { getUser } from "./components/storage.mjs";
import { deletePost, deleteHTML } from "./components/delete-post.mjs";

const postContainer = document.querySelector(".post-container");
const id = Number(new URLSearchParams(document.location.search).get("id"));

const token = loggedIn();

const options = {
  method: "Get",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

apiCall(
  `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true`,
  options
)
  .then((response) => {
    console.log(response);
    const {
      title,
      body,
      created,
      author: { name },
    } = response;
    postContainer.innerHTML = `
  <div class="card p-3 single">
    <div class="row">
      <p class="col">By ${name}</p>
      <div class="col text-end">${new Date(created).toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}</div>
    </div>
    <h3 class="h4">${title}</h3>
    <p>
      ${body}
    </p>
    <div class="d-flex justify-content-between">
    <div class="d-flex">
      <div class="d-flex align-items-center me-5">
        <div class="me-2">1023</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </div>
      <div class="d-flex align-items-center">
        <div class="me-2">102</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chat-text-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"
          />
        </svg>
      </div>
    </div>
    ${deleteHTML(getUser().name, name)}
    </div>    
  </div>`;
  })
  .then(() => {
    const deleteBtn = document.querySelector(".delete");
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        deletePost(id, token);
      };
    }
  });
