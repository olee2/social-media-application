/**
 * A function for rendering HTML for the delete and edit buttons if the logged in user is the author.
 * @param {string} user The name of the logged in user
 * @param {string} author The name of the author of the post
 * @returns Html for the delete and edit buttons if the user is the author of the post, else an empty string
 */

export const modifyHTML = (user, author) => {
  const html = `

    <div class="d-flex align-items-center">
     <p class="m-0 me-3 edit">Edit</p>
    <p class="m-0 delete">Delete</p>
    </div>
    `;

  if (user === author) {
    return html;
  } else {
    return ``;
  }
};
