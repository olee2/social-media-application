import { loggedIn } from "./components/loggedIn.mjs";
import { apiCall } from "./components/api.mjs";
import { singlePost } from "./components/createHtml.mjs";
import { editPost, deletePost } from "./components/posts.mjs";
import { setLoader } from "./components/loader.mjs";
import { errorHtml } from "./components/error.mjs";

const postContainer = document.querySelector(".post-container");
const id = Number(new URLSearchParams(document.location.search).get("id"));

const token = loggedIn();
postContainer.innerHTML = setLoader();

const options = {
  method: "Get",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

apiCall(
  `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true&_reactions=true`,
  options
)
  .then((data) => {
    postContainer.innerHTML = singlePost(data);
    return data;
  })
  .then((data) => {
    const deleteBtn = document.querySelector(".delete");
    const editBtn = document.querySelector(".edit");
    const modal = document.querySelector("dialog");
    const close = document.querySelector(".close-btn");
    const editForm = document.querySelector(".edit-form");
    const editTitle = document.getElementById("edit-title");
    const editMessage = document.getElementById("edit-message");
    const editUrl = document.getElementById("media");
    const signalContainer = document.querySelector(".signal");

    const { title, body, media } = data;

    if (deleteBtn) {
      deleteBtn.onclick = () => {
        deletePost(id);
        alert("Post deleted");
        location.assign("../profile.html");
      };

      close.onclick = () => {
        modal.close();
        console.log("yellow");
      };

      editBtn.onclick = () => {
        modal.showModal();
        editTitle.value = title;
        editMessage.value = body;
        editUrl.value = media;
      };

      editForm.onsubmit = async (e) => {
        e.preventDefault();

        try {
          const form = e.target;
          const formData = new FormData(form);
          const body = Object.fromEntries(formData.entries());

          if (!body.media) {
            delete body.media;
          }
          await editPost(body, id);
          modal.close();
          editForm.reset();
          location.reload();
        } catch (error) {
          const errorObj = JSON.parse(localStorage.getItem("error"));
          signalContainer.innerHTML = errorHtml(errorObj.message);
          localStorage.removeItem("error");
        }
      };
    }
  })
  .catch((error) => {
    const errorObj = JSON.parse(localStorage.getItem("error"));
    postContainer.innerHTML = errorHtml(errorObj.message);
  });
