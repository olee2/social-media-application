import { loggedIn } from "./components/logged-in.mjs";
import { apiCall } from "./components/api.mjs";
import { deletePost, modifyHTML } from "./components/modify-post.mjs";
import { singlePost } from "./components/createHtml.mjs";
import { editPost } from "./components/posts.mjs";

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
  `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true&_reactions=true`,
  options
)
  .then((data) => {
    postContainer.innerHTML += singlePost(data);
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

    const { title, body, media } = data;

    if (deleteBtn) {
      deleteBtn.onclick = () => {
        deletePost(id, token);
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
      };
    }
  });
