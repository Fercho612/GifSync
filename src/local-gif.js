import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getGifs(query) {
  await fakeNetwork(`getGifs:${query}`);
  let gifs = await localforage.getItem("gifs");
  if (!gifs) gifs = [];
  if (query) {
    gifs = matchSorter(gifs, query, { keys: ["name"] });
  }
  return gifs.sort(sortBy("name", "createdAt"));
}

export async function createGif() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let gif= { id, createdAt: Date.now() };
  let gifs = await getGifs();
  gifs.unshift(gif);
  await set(gifs);
  return gif;
}

export async function getGif(id) {
  await fakeNetwork(`gif:${id}`);
  let gifs = await localforage.getItem("gifs");
  let gif = gifs.find(gif => gif.id === id);
  return gif ?? null;
}

export async function updateGif(id, updates) {
  await fakeNetwork();
  let gifs = await localforage.getItem("gifs");
  let gif = gifs.find(gif => gif.id === id);
  if (!gif) throw new Error("No contact found for", id);
  Object.assign(gif, updates);
  await set(gifs);
  return gif;
}
export async function deleteGif(id) {
  let gifs = await localforage.getItem("gifs");
  console.log(id)
  let index = gifs.findIndex(gif => gif.id === id);
  if (index > -1) {
    gifs.splice(index, 1);
    await set(gifs);
    return true;
  }
  return false;
}

function set(gifs) {
  return localforage.setItem("gifs", gifs);
}

let fakeCache = {};
async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}