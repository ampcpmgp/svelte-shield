import Dexie from 'dexie'

export const db = new Dexie('SvelteShieldApp')

// Schema Syntax: https://dexie.org/docs/Version/Version.stores()#schema-syntax
db.version(1).stores({
  books: '&hash,title,url,license,content,readingRatio,insertedDate',
})

export function setbook(book) {
  // https://dexie.org/docs/Table/Table.put()
  return db.books.put(book)
}

export async function existsbook(hash) {
  const count = await db.books
    .where('hash')
    .equals(hash)
    .count()

  return count === 1
}

export function deletebook(hash) {
  return db.books
    .where('hash')
    .equals(hash)
    .delete()
}
