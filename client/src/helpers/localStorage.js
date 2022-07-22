//GET item
export const getItem = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return undefined;
};

//Remove Item
export const removeItem = (key) => {
  localStorage.removeItem(key);
};
