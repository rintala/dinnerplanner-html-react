function readCookie(model) {
  if (!!document.cookie) {
    const cookie = parsingCookie();
    console.log('cookie: ', cookie)
    if (!isNaN(parseInt(cookie.guests))) {
      model.setNumberOfGuests(cookie.guests);
      console.log('cookie: guests set')
    }

    if ((cookie.dishes + '').split(',').length > 0) {
      console.log('cookie: setting dishes', cookie.dishes)
      console.log('cookie: ', cookie.dishes)
      if (!cookie.dishes) return new Promise(resolve => {
        console.log('no dish loaded')
        resolve();
      });
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
      console.log('no cookie loaded')
      resolve();
    });
  }
}

function parsingCookie() {
  const cookie = document.cookie
  return cookie.split(';').reduce((acc, cur, idx) => {
    const [key, val] = cur
      .trim()
      .split('=')
      .map(decodeURIComponent);

    console.log('%c----------------', 'font-size: 1.5rem')
    return Object.assign(acc, { [key]: val })
  }, (''))
}

export default readCookie