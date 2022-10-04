/**
 * Function for storing the user's information (name, token etc.) in local storage.
 * @param {JSON} user A JSON object with a users credentials.
 */

export const storeUser = (user) => {
  localStorage.setItem("credentials", JSON.stringify(user));
};

/**
 * Function for retrieving the user's information (name, token etc.) from local storage.
 * @returns An object with the user's information.
 */

export const getUser = () => {
  return JSON.parse(localStorage.getItem("credentials"));
};
