import test from 'ava'
import kokoro from './json/kokoro.json'
import * as morpheme from './morpheme'

test('composite - 夏目漱石 こころ', t => {
  const result = morpheme.composite(kokoro)

  t.deepEqual(result, [])
})
