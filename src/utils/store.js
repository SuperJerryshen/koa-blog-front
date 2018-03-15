class Store {
  get(key) {
    return localStorage.getItem(key);
  }
  set(key, val) {
    return localStorage.setItem(key, val);
  }
  rm(key) {
    return localStorage.removeItem(key);
  }
  getAll() {
    return localStorage;
  }
}

export default new Store();
