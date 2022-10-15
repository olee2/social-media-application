/**
 * A function for logging out the user by deleting credentials from local storage.
 */

export const logOut = () => {
  localStorage.removeItem("credentials");
};
