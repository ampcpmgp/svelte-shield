import test from 'ava'
import { currentWord } from './morphemes'

test('挨拶が出来る', t => {
  currentWord.subscribe(value => {
    t.is(value, 'Hello world!')
  })
})
