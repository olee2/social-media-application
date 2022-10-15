import { apiCall } from "./components/api.mjs";
import { storeUser } from "./components/storage.mjs";
import { errorHtml } from "./components/error.mjs";
import { setLoader } from "./components/loader.mjs";

const form = document.querySelector("form");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const signalContainer = document.querySelector(".signal");

form.onsubmit = async (e) => {
  e.preventDefault();

  const options = {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  signalContainer.innerHTML = setLoader();

  try {
    const data = await apiCall(
      "https://nf-api.onrender.com/api/v1/social/auth/login",
      options
    );

    storeUser(data);
    location.assign("../profile.html");
  } catch (error) {
    const errorMessage = JSON.parse(localStorage.getItem("error")).message;
    signalContainer.innerHTML = errorHtml(errorMessage);
    localStorage.removeItem("error");
  }
};
