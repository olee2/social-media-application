/**
 *
 * @param {string} url The API end-point.
 * @param {object} options An object containing the method, body, headers etc.
 * @returns {json} If the response.ok is true a json object will be returned. If not, the response object will be
 * stored in localstorage, in order for us to use the error message returned in another module.
 * @example
 * ```js
 *   const options = {
 *    method: "POST",
 *    body: JSON.stringify({
 *    name: "name",
 *    email: "email",
 *    password: "password",
 *    }),
 *    headers: { "Content-type": "application/json; charset=UTF-8" },
 *   };
 *
 *   apiCall("https://nf-api.onrender.com/api/v1/social/auth/register", options)
 *   .then((response)=>{console.log(response)})
 *
 * ```
 */

export const apiCall = async (url, options) => {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  }

  const errorObject = await response.json();
  localStorage.setItem("error", JSON.stringify(errorObject));

  throw new Error(`${response.status} ${response.statusText}`);
};
