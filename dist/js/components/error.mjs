/**
 *
 * @param {string} message An error message
 * @returns A html paragraph with the error message.
 */

export const errorHtml = (message) => {
  return `<p class="text-danger">${message}</p>`;
};
