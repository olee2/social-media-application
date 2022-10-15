import { getUser } from "./storage.mjs";

/**
 * Function for verifying if there is a JWT stored in local storage and returning it.
 * If there is no user credentials stored in local storage an error will occur and trigger a redirect to the login page.
 * @returns A JWT
 */

export const loggedIn = () => {
  try {
    return getUser().accessToken;
  } catch (error) {
    location.assign("../login.html");
  }
};
