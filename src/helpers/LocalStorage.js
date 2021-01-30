import SimpleCrypto from 'simple-crypto-js';
// Function for set location on window
import qs from 'qs';

const LocalStorage = {};

// Function for get local storage
LocalStorage.get = (key) => localStorage.getItem(key);

// Function for get JSON form local storage
LocalStorage.getJSON = (key) => {
  const data = LocalStorage.get(key);
  return JSON.parse(data);
};

// Function for set local storage
LocalStorage.set = (key, value) => localStorage.setItem(key, value);

// Function for set JSON local storage
LocalStorage.setJSON = (key, value) => {
  const data = JSON.stringify(value);
  return LocalStorage.set(key, data);
};

// Function for remove local storage
LocalStorage.remove = (key) => localStorage.removeItem(key);

// Function for clear local storage
LocalStorage.clean = () => localStorage.clear();

export default LocalStorage;


export const localStorageKey = {
  user: 'USER',
  authToken: 'AUTH_TOKEN',
  authData: 'AUTH_DATA',
};


const secretKey = 'herajnextapps';

export const Crypto = new SimpleCrypto(secretKey);

export const getToken = () => {
  let user = LocalStorage.get(localStorageKey.user);
  user = user && Crypto.decrypt(user) ? JSON.parse(Crypto.decrypt(user)) : null;
  return user && user.token ? user.token : null;
};

export const getUser = () => {
  let user = LocalStorage.get(localStorageKey.user);
  user = user && Crypto.decrypt(user) ? JSON.parse(Crypto.decrypt(user)) : null;
  return user || null;
};

export const getSessionUser = () => {
  let sessionUser = sessionStorage[localStorageKey.authData];
  sessionUser = sessionUser ? Crypto.decrypt(sessionUser) : null;
  return sessionUser ? JSON.parse(sessionUser) : null;
};

export const getQueryData = (string) => {
  const data = (string).substring(1);
  return qs.parse(data);
};

export const maxCharCount = 300 * 5;
export const setMaxWord = (word) => {
  let text = word;
  text = text.substr(0, maxCharCount - 1);
  return text;
};
