/**
 * This function verify if there is media added to a post and returns html if it is.
 * @param {string} media A url string for media that should be added to a post
 * @returns Either html or an empty string.
 */

export const isMedia = (media) => {
  if (media) {
    return `<img class="mb-3" src="${media}"/>`;
  }
  return "";
};
