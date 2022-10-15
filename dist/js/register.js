import { apiCall } from "./components/api.mjs";
import { setLoader } from "./components/loader.mjs";
import { errorHtml } from "./components/error.mjs";

const form = document.querySelector("form");
const signalContainer = document.querySelector(".signal");

form.onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  if (!profile.avatar) {
    delete profile.avatar;
  }

  const options = {
    method: "POST",
    body: JSON.stringify(profile),
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
