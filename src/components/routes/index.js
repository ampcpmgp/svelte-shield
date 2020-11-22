import Home from './Home'
import Books from './Books'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/books': Books,
  '*': NotFound,
}
