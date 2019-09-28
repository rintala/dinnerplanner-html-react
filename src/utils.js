export const cutOverflowingText = (text, numberOfChars) => {
  if (text.length > numberOfChars) {
    return text.substr(0, numberOfChars) + "...";
  }
  return text;
};

/* export default cutOverflowingText; */

export const displayLoader = () => {
  document.getElementById("loader").style.display = "inline-block";
};

/* export default displayLoader; */

export const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

/* export default hideLoader; */

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
