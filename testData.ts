interface User {
  username: string | undefined;
  password: string | undefined;
}

export const USER: User = {
  username: process.env.USERNAME1,
  password: process.env.PASSWORD,
};

interface Api {
  url: string | undefined;
  key: string | undefined;
}

export const API: Api = {
  url: process.env.API_URL,
  key: process.env.API_KEY,
};

export const URL: string | undefined = process.env.URL;
export const API_URL: string | undefined = process.env.API_URL;
export const API_KEY: string | undefined = process.env.API_KEY;
export const APP_URL: string | undefined = process.env.APP_URL;
export const COOKIE: string | undefined = process.env.COOKIE;

export function ValidRandomString(length: number) {
  let result = '';
  const characters =
    'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function InvalidRandomString(length: number) {
  let result = '';
  const characters = `"!@#$%^&()_{}[]+/-.,/:;<=>?/'`;
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function RandomNumberString(length: number) {
  let result = '';
  const characters = '123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export function RandomString(length: number) {
  let result = '';
  const characters = 'aoiueAOIUE';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
