import { logOut } from "./components/log-out.mjs";
import { loggedIn } from "./components/logged-in.mjs";
import { getPosts, createPost } from "./components/posts.mjs";
import { postsHtml } from "./components/createHtml.mjs";
import { setLoader } from "./components/loader.mjs";

const form = document.querySelector(".post-form");
const search = document.querySelector(".search-form");
const searchField = document.querySelector(".search-field");
const sortBy = document.querySelector("#sort");
const postContainer = document.querySelector(".posts-container");
const imageFilter = document.getElementById("image-filter");

postContainer.innerHTML = setLoader();

const logOutBtn = document.querySelector(".log-out");

logOutBtn.onclick = () => logOut();

const main = async () => {
  postContainer.innerHTML = setLoader();
  const posts = await getPosts(sortBy.value);
  postContainer.innerHTML = postsHtml(
    posts,
    imageFilter.checked,
    searchField.value
  );
};

search.onsubmit = async (e) => {
  e.preventDefault();
  await main();
  search.reset();
};

imageFilter.onchange = () => {
  main();
};

form.onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries());

  console.log(body);

  if (!body.media) {
    delete body.media;
  }

  await createPost(body);
  form.reset();
  location.reload();
};

main();

sortBy.onchange = () => {
  main();
};
