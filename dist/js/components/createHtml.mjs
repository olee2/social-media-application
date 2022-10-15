import { modifyHTML } from "./modifyPost.mjs";
import { getUser } from "./storage.mjs";
import { isMedia } from "./media.mjs";

/**
 * This is a function for adding creating html for all the posts on the feed.
 * @param {array} posts An array of objects.
 * @param {boolean} imageFilter Wether or not the user is filtering out posts without image.
 * @param {string} searchTerm If a search term is provided, the function will look for posts titles and authors that match.
 * @returns A string with the html for all the posts that matched the above configurations.
 */

export const postsHtml = (posts, imageFilter = false, searchTerm) => {
  if (imageFilter) {
    posts = posts.filter((post) => post.media);
  }
  if (searchTerm) {
    posts = posts.filter((post) => {
      return (
        post.title.search(searchTerm) > -1 ||
        post.author.name.search(searchTerm) > -1
      );
    });
  }

  let filteredPosts = posts.map((post) => {
    const {
      id,
      title,
      body,
      created,
      author: { name },
      media,
    } = post;

    return `
  <div class="card p-3 single">
  <a href="/single-post.html?id=${id}">
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
    ${isMedia(media)}
    </a>
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

    </div>    
  </div>`;
  });

  return filteredPosts.join("");
};

/**
 *
 * @param {object} post A post object is fed into the function.
 * @returns Html for a single post.
 */

export const singlePost = (post) => {
  const {
    title,
    body,
    created,
    author: { name },
    media,
  } = post;
  return `
  <div class="card p-3 single">
    <div class="row">
      <p class="col">By ${name} </p>
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
    ${isMedia(media)}
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
      ${modifyHTML(getUser().name, name)}
    </div>
  </div>
  <dialog>
  <h1 class="h2 text-primary mb-3">Edit post</h1>
  <div class="signal"></div>
    <form class="col-12 edit-form">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" name="title" class="form-control" id="edit-title" />
      </div>
      <div class="mb-3">
        <label for="media" class="form-label">Image URL</label>
        <input type="url" name="media" class="form-control" id="media" />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" name="body" id="edit-message" rows="3"></textarea>
      </div>
      <button class="btn-outline-primary btn">Update</button>
      <a class="btn-outline-secondary btn close-btn ms-2">Close</a>
    </form>
  </dialog>
`;
};

/**
 *
 * @param {object} profile An object with the profile details of the logged in user
 * @returns Html for the profile.
 */

export const profileHtml = (profile) => {
  const { name, avatar } = profile;

  return `
          <img
            src=${avatar ? avatar : "dist/images/man.svg"}
            class="align-self-center img-thumbnail w-50 mb-3 mt-5 rounded-circle profile-image"
            alt=""
          />
          <h1 class="h1 mb-2">${name}</h1>
          <p class="mb-2">Somewhere, Norway</p>
          <p>My name is ${name}. Welcome to my profile.</p>
          <div class="row">
            <div class="col">
              <button class="btn btn-primary">Follow</button>
            </div>
            <div class="col">
              <button class="btn btn-outline-primary">Message</button>
            </div>
          </div>`;
};
