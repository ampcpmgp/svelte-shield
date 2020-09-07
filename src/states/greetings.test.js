import test from 'ava'
import { greeting } from './greetings'

test('挨拶が出来る', t => {
  greeting.subscribe(value => {
    t.is(value, 'Hello world!')
  })
})
