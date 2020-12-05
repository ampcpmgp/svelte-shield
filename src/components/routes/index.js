import Home from './Home.svelte'
import Books from './Books.svelte'
import Book from './Book.svelte'
import NotFound from './NotFound.svelte'

export default {
  '/': Home,
  '/books': Books,
  '/books/:hash': Book,
  '*': NotFound,
}
