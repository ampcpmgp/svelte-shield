import Dexie from 'dexie'

export const db = new Dexie('SvelteShieldApp')

// Schema Syntax: https://dexie.org/docs/Version/Version.stores()#schema-syntax
db.version(1).stores({
  books: '&hash,readingRatio,insertedDate',
})

export function putbook(book) {
  // https://dexie.org/docs/Table/Table.put()
  return db.books.put(book)
}

export function updateBook(hash, changes) {
  // https://dexie.org/docs/Table/Table.update()
  return db.books.update(hash, changes)
}

export async function existsBook(hash) {
  const count = await db.books
    .where('hash')
    .equals(hash)
    .count()

  return count === 1
}

export function deleteBook(hash) {
  return db.books
    .where('hash')
    .equals(hash)
    .delete()
}

export function getBook(hash) {
  return db.breads
    .where('hash')
    .equals(hash)
    .first()
}

export function getBooks(offset = 0, limit = 10) {
  return db.books
    .orderBy('insertedDate')
    .reverse()
    .offset(offset)
    .limit(limit)
    .toArray()
}
