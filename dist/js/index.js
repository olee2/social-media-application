import { logOut } from "./components/logOut.mjs";
import { loggedIn } from "./components/loggedIn.mjs";
import { getPosts, createPost } from "./components/posts.mjs";
import { postsHtml } from "./components/createHtml.mjs";
import { setLoader } from "./components/loader.mjs";
import { getUser } from "./components/storage.mjs";
import { errorHtml } from "./components/error.mjs";

loggedIn();

const form = document.querySelector(".post-form");
const search = document.querySelector(".search-form");
const searchField = document.querySelector(".search-field");
const sortBy = document.querySelector("#sort");
const postContainer = document.querySelector(".posts-container");
const imageFilter = document.getElementById("image-filter");
const avatarContainer = document.querySelector(".avatar-container");
const signalContainer = document.querySelector(".signal");
const user = getUser();

postContainer.innerHTML = setLoader();
avatarContainer.innerHTML = `
          <img
            src=${user.avatar ? user.avatar : "dist/images/man.svg"}
            class="align-self-center img-thumbnail p-0 rounded-circle ms-2"
            alt=""
          />`;

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

  try {
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
  } catch (error) {
    const errorObj = JSON.parse(localStorage.getItem("error"));
    signalContainer.innerHTML = errorHtml(errorObj.message);
    localStorage.removeItem("error");
  }
};

main();

sortBy.onchange = () => {
  main();
};
