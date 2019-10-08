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
      console.log('reading cookie done in reading cookie')
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
  return document.cookie.split(';').reduce((acc, cur, idx) => {
    if (idx === 1) {
      // Special case for the first iteration.
      const [key, val] = acc.trim().split('=').map(decodeURIComponent);
      acc = { [key]: val }
    }
    const [key, val] = cur
      .trim()
      .split('=')
      .map(decodeURIComponent);
    return Object.assign(acc, { [key]: val })
  })
}

export default readCookie