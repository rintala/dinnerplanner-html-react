export const cutOverflowingText = (text, numberOfChars) => {
  if (!text) return
  if (text.length > numberOfChars) {
    return text.substr(0, numberOfChars) + "...";
  }
  return text;
};

export const displayLoader = () => {
  document.getElementById("loader").style.display = "inline-block";
};

export const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

export const addingDishesToMenu = (model, id) => {
  return new Promise(resolve => {
    model.getDish(id).then(dish => {
      model.addDishToMenu(dish);
      resolve();
    });
  });
};

export default {
  cutOverflowingText,
  displayLoader,
  hideLoader,
  addingDishesToMenu
};
