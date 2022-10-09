export const isMedia = (media) => {
  if (media) {
    return `<img class="mb-3" src="${media}"/>`;
  }
  return "";
};
