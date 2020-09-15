const kuromoji = require('kuromoji')

const fileName = 'インフレーション理論'
const sentence = `
この見かけの矛盾はインフレーション理論で解決される。
`

const dir = 'src/states/morpheme-test/'

function js() {
  return `import test from 'ava'
import json from './${fileName}.json'
import { composite } from '../morpheme'

test('composite/${fileName}', t => {
  const result = composite(json)

  t.deepEqual(result, [])
})
`
}

kuromoji
  .builder({ dicPath: 'node_modules/kuromoji/dict' })
  .build(function(err, tokenizer) {
    if (err) throw err

    const path = tokenizer.tokenize(sentence)
    const json = JSON.stringify(path, null, '  ')
    const jsonPath = require('path').join(dir, `${fileName}.json`)
    const testPath = require('path').join(dir, `${fileName}.test.js`)

    require('fs').writeFileSync(jsonPath, json)
    console.log(`Created ${jsonPath}`)

    require('fs').writeFileSync(testPath, js())
    console.log(`Created ${testPath}`)
  })
