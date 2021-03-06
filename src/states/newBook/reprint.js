import { get, writable } from "svelte/store";
import { encode } from "@msgpack/msgpack";
import * as ipfs from "../../databases/ipfs";
import * as dexie from "../../databases/dexie";
import { default as BookType } from "../../const/BookType";
import * as validate from "../../utils/validate";

export const title = writable("");
export const url = writable("");
// { value: string } or undefined
export const license = writable(undefined);
export const content = writable("");

export function reset() {
  title.set("");
  url.set("");
  license.set(undefined);
  content.set("");
}

export async function validateAll() {
  validate.content(get(content));
}

export async function save() {
  const data = {
    bookType: BookType.REPRINT,
    title: get(title),
    url: get(url),
    license: get(license).value,
    content: get(content),
  };

  const encodedData = encode(data);
  const results = await ipfs.add(encodedData);

  const { path } = results;

  const isExistsInDb = await dexie.existsBook(path);

  if (!isExistsInDb) {
    await dexie.putbook({
      hash: path,
      readingRatio: 0,
      insertedDate: new Date(),
    });
  }

  reset();
  ipfs.addPin(path);

  return results;
}
