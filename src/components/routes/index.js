import Home from './Home'
import Book from './Book'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/book': Book,
  '*': NotFound,
}
