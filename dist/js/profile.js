import { logOut } from "./components/logOut.mjs";
import { profileHtml, postsHtml } from "./components/createHtml.mjs";
import { setLoader } from "./components/loader.mjs";
import { getUser } from "./components/storage.mjs";
import { getPosts } from "./components/posts.mjs";

const logOutBtn = document.querySelector(".log-out");
const profile = document.querySelector(".profile-details");
const postContainer = document.querySelector(".post-container");
const details = getUser();

profile.innerHTML = setLoader();

logOutBtn.onclick = () => logOut();

profile.innerHTML = profileHtml(details);

postContainer.innerHTML = setLoader();

getPosts("desc").then((posts) => {
  posts = posts.filter((post) => post.author.name === details.name);

  if (posts.length) {
    postContainer.innerHTML = postsHtml(posts);
  } else {
    postContainer.innerHTML = `<p>No posts from ${details.name}</p>`;
  }
});
