class Store {
  get(key) {
    return localStorage.getItem(key);
  }
  set(key, val) {
    return localStorage.setItem(key, val);
  }
  rm(key) {
    if (typeof key === 'string') {
      return localStorage.removeItem(key);
    } else if (key.constructor === Array) {
      key.forEach(function(o) {
        localStorage.removeItem(o);
      });
    } else {
      throw TypeError('param must be array or string.');
    }
  }
  getAll() {
    return localStorage;
  }
}

export default new Store();
