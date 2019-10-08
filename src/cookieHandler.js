function readCookie(model) {
  if (!!document.cookie) {
    const cookie = parsingCookie();
    console.log('cookie: ', cookie)
    if (!isNaN(parseInt(cookie.guests))) {
      model.setNumberOfGuests(cookie.guests);
    }

    if ((cookie.dishes + '').split(',').length > 0) {
      let dishArray = (cookie.dishes + '').split(',');
      let promiseArray = dishArray.map(dishId => {
        return new Promise(resolve => {
          model.getDish(dishId).then(dish => {
            model.addDishToMenu(dish);
            resolve();
          });
        });
      });
      return Promise.all(promiseArray);
    }
  } else {
    return new Promise(resolve => {
      resolve();
    });
  }
}

function parsingCookie() {
  console.log(document.cookie.split(';'))
  return document.cookie.split(';').reduce((res, c) => {
    const [key, val] = c
      .trim()
      .split('=')
      .map(decodeURIComponent);
    return Object.assign(res, { [key]: val })
  })
}

export default readCookie