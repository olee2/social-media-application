import { apiCall } from "./components/api.mjs";
import { setLoader } from "./components/loader.mjs";
import { errorHtml } from "./components/error.mjs";

const form = document.querySelector("form");
const user = document.querySelector(".user-name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const signalContainer = document.querySelector(".signal");

form.onsubmit = async (e) => {
  e.preventDefault();

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: user.value,
      email: email.value,
      password: password.value,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  signalContainer.innerHTML = setLoader();

  try {
    await apiCall(
      "https://nf-api.onrender.com/api/v1/social/auth/register",
      options
    );
    location.assign("../login.html");
  } catch (error) {
    const errorObj = JSON.parse(localStorage.getItem("error"));
    if (errorObj.statusCode === 500) {
      signalContainer.innerHTML = errorHtml("An error occured");
    } else {
      const errorMessage = errorObj.message;
      signalContainer.innerHTML = errorHtml(errorMessage);
      localStorage.removeItem("error");
    }
  }
};
